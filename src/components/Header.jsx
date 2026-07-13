export default function Header() {
  return (
    <header>
      <div className="wrap header-inner">
        <div className="wordmark">
          <svg className="flag-mark" viewBox="0 0 16 16" fill="none">
            <path d="M2 1V15" stroke="#E2572B" strokeWidth="1.4" strokeLinecap="round" />
            <path
              d="M2 2C4 1.3 5.5 2.7 8 2C10.5 1.3 12 2.7 14 2V8C12 8.7 10.5 7.3 8 8C5.5 8.7 4 7.3 2 8V2Z"
              fill="#7B6FD6"
            />
          </svg>
          Fanfare
        </div>
        <div className="header-tag">A programme for your launch</div>
      </div>
    </header>
  )
}
