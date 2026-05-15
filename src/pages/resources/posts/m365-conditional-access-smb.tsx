/* ----------------------------------------------------------------------------
 * SAMPLE POST — replace or expand before treating as final.
 *
 * The body component here is rendered inside an <article className="prose ...">
 * wrapper provided by ResourcePost.tsx — so writing structured JSX (h2/h3/p/ul)
 * with no extra prose classes is enough; @tailwindcss/typography handles the
 * visual rhythm.
 * -------------------------------------------------------------------------- */

export default function M365ConditionalAccessSMB() {
  return (
    <>
      <p className="lead">
        Conditional Access is the most important security control in Microsoft 365 — and the
        one most growing teams either skip entirely or configure once and never revisit.
        Below is the minimum-viable baseline we deploy on day one of every engagement, why
        each rule earns its place, and how to roll it out without lighting the help desk on fire.
      </p>

      <h2 id="why-baseline">Why a baseline at all</h2>
      <p>
        The vast majority of account-takeover incidents we see start with a credential phished
        from a personal device, then replayed against a tenant with no Conditional Access rules
        in place. The fix isn't sophisticated — it's just a small set of rules consistently
        applied. The hard part is rolling them out without breaking access for the people who
        keep the business running.
      </p>

      <h2 id="the-baseline">The baseline (in priority order)</h2>

      <h3>1. MFA-everywhere for admins</h3>
      <p>
        Every account with any administrative role — Global Admin, Exchange Admin, SharePoint
        Admin, even Compliance Admin — gets blocked unless MFA is satisfied. No exceptions, no
        IP allowlist for "the office," no break-glass shortcuts that aren't documented and
        monitored. If you can only ship one rule this week, ship this one.
      </p>

      <h3>2. Block legacy authentication</h3>
      <p>
        Legacy auth protocols (POP, IMAP, SMTP-AUTH, basic-auth Exchange ActiveSync) bypass
        MFA entirely. Microsoft has been deprecating them for years; most attacks against
        small tenants still rely on them. Block at the Conditional Access layer — not just at
        the mailbox level — so it's enforced for every workload.
      </p>

      <h3>3. MFA for all users on first sign-in from a new device or location</h3>
      <p>
        For non-admins, requiring MFA on every sign-in creates fatigue. Requiring it only when
        the sign-in is from an unfamiliar device or unusual location captures most of the
        risk at a fraction of the friction. Combine with sign-in risk policies (Identity
        Protection) if you have a P2 license.
      </p>

      <h3>4. Compliant-device requirement for sensitive apps</h3>
      <p>
        Once Intune or another MDM is in place, scope a policy that requires a managed,
        compliant device for access to sensitive apps — typically Exchange, SharePoint,
        Finance/HR SaaS via SAML. This is the single biggest blast-radius reduction available
        in M365 short of full Zero Trust.
      </p>

      <h3>5. Block sign-ins from unsupported countries</h3>
      <p>
        If you don't operate in a country, block sign-ins from it. This is not a security
        measure on its own — anyone serious uses a VPN — but it dramatically reduces noise
        in your sign-in logs and stops the easy automated attacks. Pair with named locations
        and a clear exception process for travelers.
      </p>

      <h2 id="rollout">Rolling out without breaking things</h2>
      <ul>
        <li>
          <strong>Report-only first.</strong> Every rule supports a "report only" mode. Run for
          1–2 weeks. Read the sign-in logs. Find the breakage before users do.
        </li>
        <li>
          <strong>Communicate before you enable.</strong> Two emails: one a week before, one
          the morning of. Include screenshots of what the MFA prompt looks like and a
          three-step "what to do if you're locked out" path.
        </li>
        <li>
          <strong>Set up break-glass accounts.</strong> Two cloud-only Global Admin accounts,
          excluded from all CA policies, password stored in a sealed envelope. Test annually.
        </li>
        <li>
          <strong>Don't try to ship all five at once.</strong> Ship #1 and #2 together. Wait two
          weeks. Then ship #3. Wait. Then #4 and #5. Each rule has a different breakage profile;
          stacking them obscures which one caused a problem.
        </li>
      </ul>

      <h2 id="evidence">Evidence: what to capture for compliance</h2>
      <p>
        Whether you're chasing SOC 2, HIPAA, or just a cyber-insurance renewal, the auditor will
        want three things: a screenshot or export of the policies themselves, a sign-in-log
        sample showing the policies are firing, and the change-control record from when you
        rolled them out. Build the export-and-archive into your quarterly access-review process
        and you'll never scramble.
      </p>

      <h2 id="next-steps">Next steps</h2>
      <p>
        If you want to map this baseline to your tenant, our IT Assessment includes a
        Conditional Access posture review — the same checklist we apply on day one of an
        engagement. Or, if you're rolling these yourself, the Microsoft documentation around
        "Conditional Access: Common policies" is the canonical reference.
      </p>
    </>
  );
}
