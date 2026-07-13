const MODEL = 'gemini-flash-latest'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

// Gemini's Schema object is a restricted subset of OpenAPI 3.0, not JSON Schema:
// type values are uppercase enums, and there is no additionalProperties field.
const PROGRAMME_SCHEMA = {
  type: 'OBJECT',
  properties: {
    listing: {
      type: 'OBJECT',
      description: 'App Store style listing copy.',
      properties: {
        title: { type: 'STRING', description: 'App Store title, including the app name.' },
        subtitle: { type: 'STRING', description: 'A short subtitle line under the title.' },
        keywords: {
          type: 'STRING',
          description: 'Four to six comma separated App Store search keywords.',
        },
      },
      required: ['title', 'subtitle', 'keywords'],
    },
    social: {
      type: 'OBJECT',
      description: 'Launch posts for social platforms.',
      properties: {
        x: { type: 'STRING', description: 'A short post for X, under 280 characters.' },
        linkedin: { type: 'STRING', description: 'A short launch post for LinkedIn.' },
        tiktokHook: {
          type: 'STRING',
          description: 'A single spoken opening line for a short video. Do not wrap it in quote marks.',
        },
      },
      required: ['x', 'linkedin', 'tiktokHook'],
    },
    launch: {
      type: 'OBJECT',
      description: 'A Product Hunt style launch post.',
      properties: {
        title: { type: 'STRING', description: 'A one line launch post title.' },
        body: {
          type: 'STRING',
          description: 'Two or three short paragraphs for the launch post body, separated by a blank line.',
        },
      },
      required: ['title', 'body'],
    },
    hero: {
      type: 'OBJECT',
      description: 'Landing page hero copy.',
      properties: {
        headline: { type: 'STRING', description: 'A short, punchy hero headline.' },
        subhead: { type: 'STRING', description: 'One sentence hero subhead.' },
      },
      required: ['headline', 'subhead'],
    },
  },
  required: ['listing', 'social', 'launch', 'hero'],
}

function buildSystemPrompt() {
  return [
    'You are Fanfare, a copywriter that helps indie app developers announce a fresh launch.',
    'Given a short description of an app, you write four short, concrete pieces of launch copy:',
    'an App Store listing, social launch posts, a Product Hunt style launch post, and landing page hero copy.',
    'Write only from the details you are given. Do not invent features, numbers, or claims the person did not mention.',
    'Keep the tone plain, confident, and specific, the way a developer would talk about something they actually built, not a marketing brochure.',
    'Do not use emoji. Do not use exclamation marks.',
    'Never use an em dash or an en dash anywhere in your output. Use a period, a comma, or the word and instead.',
  ].join(' ')
}

function buildUserPrompt({ appName, target, oneLiner, storeLink }) {
  return [
    `App name: ${appName}`,
    `Who it is for: ${target}`,
    `One-liner: ${oneLiner}`,
    `Store link: ${storeLink}`,
    '',
    'Write all four sections for this app now.',
  ].join('\n')
}

export async function generateProgramme(formValues) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('Missing Gemini API key. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.')
  }

  let response
  try {
    response = await fetch(`${API_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildSystemPrompt() }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: buildUserPrompt(formValues) }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: PROGRAMME_SCHEMA,
          maxOutputTokens: 3000,
        },
      }),
    })
  } catch {
    throw new Error('Could not reach the Gemini API. Check your connection and try again.')
  }

  if (!response.ok) {
    let message = `Gemini API error (${response.status}).`
    try {
      const errorBody = await response.json()
      if (errorBody?.error?.message) {
        message = errorBody.error.message
      }
    } catch {
      // keep the default message
    }
    throw new Error(message)
  }

  const data = await response.json()

  if (data.promptFeedback?.blockReason) {
    throw new Error('Gemini declined to generate this. Try adjusting the details and submit again.')
  }

  const candidate = data.candidates?.[0]

  if (candidate?.finishReason === 'SAFETY' || candidate?.finishReason === 'RECITATION') {
    throw new Error('Gemini declined to generate this. Try adjusting the details and submit again.')
  }

  const textPart = candidate?.content?.parts?.find((part) => typeof part.text === 'string')

  if (!textPart) {
    throw new Error('The response did not include any generated copy.')
  }

  let parsed
  try {
    parsed = JSON.parse(textPart.text)
  } catch {
    throw new Error('Could not parse the generated copy.')
  }

  return parsed
}
