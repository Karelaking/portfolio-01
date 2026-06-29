const ACCOUNT_NOTICE =
  "\"Blind Pull Toggle\" installs free with an AI Canvas account. Create one (free, unlimited installs) at https://aicanvas.me/account/sign-up, then re-run this command."

export default function AccountRequired() {
  return (
    <div style={{ padding: 24, fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.6, color: '#9aa3af' }}>
      {ACCOUNT_NOTICE}
    </div>
  )
}
