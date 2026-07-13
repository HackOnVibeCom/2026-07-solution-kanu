// Local, offline fallback used only when the live Gemini call fails.
// Builds the same four-section shape as generateProgramme, using the
// person's actual submitted values, no network call involved.
export function buildLocalProgramme(formValues) {
  const appName = formValues.appName?.trim() || 'Your app'
  const target = formValues.target?.trim() || 'the people it is built for'
  const oneLiner = formValues.oneLiner?.trim() || 'it does what it says on the tin'
  const storeLink = formValues.storeLink?.trim() || 'your store link'

  return {
    listing: {
      title: `${appName}, for ${target}`,
      subtitle: oneLiner,
      keywords: `${appName}, ${target}, launch, new app, indie app`,
    },
    social: {
      x: `${appName} is live. ${oneLiner} Built for ${target}. ${storeLink}`,
      linkedin: `I just shipped ${appName}. ${oneLiner} It is built for ${target}, and it is live now. Link: ${storeLink}`,
      tiktokHook: `I built ${appName} for ${target}. Here is why.`,
    },
    launch: {
      title: `${appName}: ${oneLiner}`,
      body: `${appName} is built for ${target}. ${oneLiner}\n\nTry it here: ${storeLink}`,
    },
    hero: {
      headline: appName,
      subhead: `${oneLiner} Built for ${target}.`,
    },
  }
}
