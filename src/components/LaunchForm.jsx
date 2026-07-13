export default function LaunchForm({ values, onChange, onSubmit, busy, status, error }) {
  const buttonLabel = status === 'done' ? 'Announce again' : 'Raise the curtain'
  const hintText = busy
    ? 'Writing four acts, one at a time.'
    : status === 'done'
      ? 'The programme is set. Adjust the details to run it again.'
      : 'Four acts. About ten seconds.'

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <span className="form-card-label">The details</span>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="appName">App name</label>
          <input
            id="appName"
            type="text"
            value={values.appName}
            onChange={(e) => onChange('appName', e.target.value)}
            placeholder="Driftnote"
          />
        </div>
        <div className="field">
          <label htmlFor="target">Who it&apos;s for</label>
          <input
            id="target"
            type="text"
            value={values.target}
            onChange={(e) => onChange('target', e.target.value)}
            placeholder="people who think out loud"
          />
        </div>
        <div className="field full">
          <label htmlFor="oneLiner">One-liner</label>
          <input
            id="oneLiner"
            type="text"
            value={values.oneLiner}
            onChange={(e) => onChange('oneLiner', e.target.value)}
            placeholder="A voice journal that turns your rambling into a readable diary"
          />
        </div>
        <div className="field full">
          <label htmlFor="storeLink">Store link</label>
          <input
            id="storeLink"
            type="text"
            value={values.storeLink}
            onChange={(e) => onChange('storeLink', e.target.value)}
            placeholder="apps.apple.com/driftnote"
          />
        </div>
      </div>
      <div className="submit-row">
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? (
            <>
              Drafting the programme
              <span className="dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </>
          ) : (
            buttonLabel
          )}
        </button>
        <span className="submit-hint">{hintText}</span>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}
