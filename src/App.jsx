import { useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Programme from './components/Programme'
import { generateProgramme } from './lib/anthropic'
import { buildLocalProgramme } from './lib/localFallback'

const DEFAULT_VALUES = {
  appName: '',
  target: '',
  oneLiner: '',
  storeLink: '',
}

export default function App() {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [status, setStatus] = useState('idle') // idle | loading | revealing | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [usedFallback, setUsedFallback] = useState(false)

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'revealing') return

    setStatus('loading')
    setError('')
    setUsedFallback(false)

    try {
      const programme = await generateProgramme(values)
      setResult(programme)
      setStatus('revealing')
    } catch (err) {
      // live API failed, fall back to a local template built from the real inputs
      console.warn('Gemini call failed, using local fallback:', err)
      setResult(buildLocalProgramme(values))
      setUsedFallback(true)
      setStatus('revealing')
    }
  }

  const handleRevealComplete = useCallback(() => {
    setStatus('done')
  }, [])

  const busy = status === 'loading' || status === 'revealing'

  return (
    <>
      <Header />
      <main className="wrap">
        <Hero
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          busy={busy}
          status={status}
          error={error}
        />
        {result && (
          <Programme
            result={result}
            appName={values.appName}
            onRevealComplete={handleRevealComplete}
            usedFallback={usedFallback}
          />
        )}
      </main>
    </>
  )
}
