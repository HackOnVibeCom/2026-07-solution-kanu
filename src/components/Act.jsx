import { useRef, useState } from 'react'

export default function Act({ number, flagFill, title, rootRef, flagRef, children }) {
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = contentRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // clipboard access denied or unavailable, nothing else to do here
    }
  }

  return (
    <div className="act" ref={rootRef}>
      <div className="act-label-col">
        <span className="act-number">{number}</span>
        <svg className="act-flag" ref={flagRef} viewBox="0 0 16 16" fill="none">
          <path d="M2 1V15" stroke="#1D1B22" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M2 2C4 1.3 5.5 2.7 8 2C10.5 1.3 12 2.7 14 2V8C12 8.7 10.5 7.3 8 8C5.5 8.7 4 7.3 2 8V2Z"
            fill={flagFill}
          />
        </svg>
      </div>
      <div className="act-body-col">
        <h3>{title}</h3>
        <div className="act-content" ref={contentRef}>
          {children}
        </div>
        <div className="act-footer">
          <button type="button" className={copied ? 'copy-btn copied' : 'copy-btn'} onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
