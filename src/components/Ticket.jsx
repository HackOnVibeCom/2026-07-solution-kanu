import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Ticket({ appName }) {
  const ticketRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ticketRef.current, {
        rotation: -16,
        y: 46,
        opacity: 0,
        duration: 1.1,
        delay: 0.8,
        ease: 'back.out(1.5)',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="ticket-stage">
      <div className="ticket" ref={ticketRef}>
        <div className="ticket-face">
          <div className="ticket-main">
            <div className="ticket-kicker">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 1V15" stroke="#E2572B" strokeWidth="1.6" strokeLinecap="round" />
                <path
                  d="M2 2C4 1.3 5.5 2.7 8 2C10.5 1.3 12 2.7 14 2V8C12 8.7 10.5 7.3 8 8C5.5 8.7 4 7.3 2 8V2Z"
                  fill="#7B6FD6"
                />
              </svg>
              Opening night pass
            </div>
            <div className="ticket-appname">{appName || 'Your app'}</div>
            <div className="ticket-sub">ACT I TO IV &middot; FULL PROGRAMME &middot; ONE PERFORMANCE ONLY</div>
          </div>
          <div className="ticket-stub">
            <span className="ticket-stub-text">FANFARE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
