import LaunchForm from './LaunchForm'
import Ticket from './Ticket'

export default function Hero({ values, onChange, onSubmit, busy, status, error }) {
  return (
    <section className="hero">
      <div className="eyebrow">Built for HackOnVibe, July 2026</div>
      <h1>
        Your launch,
        <br />
        <em>announced.</em>
      </h1>
      <p className="sub">
        Tell Fanfare what you built. It writes the store listing, the social debut, the launch post, and the landing
        copy. Everything that tells the world before you&apos;ve had your coffee.
      </p>

      <LaunchForm values={values} onChange={onChange} onSubmit={onSubmit} busy={busy} status={status} error={error} />

      <Ticket appName={values.appName} />
    </section>
  )
}
