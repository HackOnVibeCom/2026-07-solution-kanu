import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Act from './Act'

const ACT_META = [
  { number: 'ACT I', title: 'The Listing', flagFill: '#E2572B' },
  { number: 'ACT II', title: 'The Debut', flagFill: '#7B6FD6' },
  { number: 'ACT III', title: 'The Premiere', flagFill: '#E2572B' },
  { number: 'ACT IV', title: 'The Marquee', flagFill: '#7B6FD6' },
]

export default function Programme({ result, appName, onRevealComplete, usedFallback }) {
  const sectionRef = useRef(null)
  const rootRefs = useRef([])
  const flagRefs = useRef([])

  useLayoutEffect(() => {
    const roots = rootRefs.current
    const flags = flagRefs.current

    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const ctx = gsap.context(() => {
      gsap.set(roots, { opacity: 0, y: 14 })
      gsap.set(flags, { opacity: 0, rotate: -35, transformOrigin: '15% 100%' })

      const tl = gsap.timeline({
        onComplete: () => {
          onRevealComplete?.()
        },
      })

      ACT_META.forEach((_, i) => {
        const startTime = i * 0.45
        tl.to(roots[i], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, startTime)
        tl.to(flags[i], { opacity: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' }, startTime + 0.12)
      })
    })

    return () => ctx.revert()
  }, [result, onRevealComplete])

  return (
    <section className="programme" ref={sectionRef}>
      <div className="programme-head">
        <span className="programme-title">The Programme</span>
        <span className="programme-meta">{(appName || 'Your app') + ', opening night'}</span>
      </div>

      {usedFallback && (
        <p className="fallback-notice">Generated from a local template. The live API was temporarily unavailable.</p>
      )}

      <Act
        {...ACT_META[0]}
        rootRef={(el) => {
          rootRefs.current[0] = el
        }}
        flagRef={(el) => {
          flagRefs.current[0] = el
        }}
      >
        <span className="tag">Title</span>
        <span className="tag">Subtitle</span>
        <span className="tag">Keywords</span>
        {'\n'}
        {result.listing.title}
        {'\n'}
        {result.listing.subtitle}
        {'\n'}
        Keywords: {result.listing.keywords}
      </Act>

      <Act
        {...ACT_META[1]}
        rootRef={(el) => {
          rootRefs.current[1] = el
        }}
        flagRef={(el) => {
          flagRefs.current[1] = el
        }}
      >
        <span className="tag">X</span>
        {'\n'}
        {result.social.x}
        {'\n\n'}
        <span className="tag">LinkedIn</span>
        {'\n'}
        {result.social.linkedin}
        {'\n\n'}
        <span className="tag">TikTok hook</span>
        {'\n'}
        &quot;{result.social.tiktokHook}&quot;
      </Act>

      <Act
        {...ACT_META[2]}
        rootRef={(el) => {
          rootRefs.current[2] = el
        }}
        flagRef={(el) => {
          flagRefs.current[2] = el
        }}
      >
        <span className="tag">Product Hunt</span>
        {'\n'}
        {result.launch.title}
        {'\n\n'}
        {result.launch.body}
      </Act>

      <Act
        {...ACT_META[3]}
        rootRef={(el) => {
          rootRefs.current[3] = el
        }}
        flagRef={(el) => {
          flagRefs.current[3] = el
        }}
      >
        <span className="tag">Hero headline</span>
        {'\n'}
        {result.hero.headline}
        {'\n\n'}
        <span className="tag">Subhead</span>
        {'\n'}
        {result.hero.subhead}
      </Act>
    </section>
  )
}
