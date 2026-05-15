export default function ItOffboardingChecklist() {
  return (
    <>
      <p className="lead">
        Offboarding a departing employee is one of the highest-risk moments in your IT security
        posture — and one of the most consistently mishandled. Orphaned accounts, retained access,
        and unrecovered devices create exploitable exposure that can persist for months. This is
        the checklist we run on every offboarding engagement.
      </p>

      <h2 id="why-offboarding-matters">Why offboarding is a security event, not just HR admin</h2>
      <p>
        The average time between an employee's last day and the deactivation of their accounts is
        longer than most security teams want to admit. In organizations without a formal
        offboarding process, we regularly find accounts that have been active for 30, 60, or 90
        days after someone left. In several cases, we've found accounts that were never disabled.
      </p>
      <p>
        The risk isn't hypothetical. Former employees with retained access have been responsible
        for data exfiltration, sabotage of infrastructure, and credential sharing that enabled
        later external attacks. Cyber insurers are starting to ask about offboarding procedures
        during underwriting. It's not a back-office process — it's a control.
      </p>

      <h2 id="day-zero">Day-of actions: must happen before the last session ends</h2>
      <p>
        These steps need to happen before or simultaneous with the employee's final working
        moment — not the next morning.
      </p>
      <ul>
        <li>
          <strong>Disable the primary identity account</strong> (Entra ID / Google Workspace).
          This is the master key. Disabling it cascades to most SaaS apps using SSO. Do this first.
        </li>
        <li>
          <strong>Invalidate all active sessions.</strong> Disabling the account is not enough —
          active OAuth tokens and browser sessions can persist. Force sign-out across all devices
          in your identity provider's admin console.
        </li>
        <li>
          <strong>Rotate any shared credentials</strong> they had access to — passwords, API keys,
          SSH keys. Document the rotations.
        </li>
        <li>
          <strong>Remove from all privileged groups</strong> (admins, billing owners, security
          roles) even before full account disable, in case there's a delay.
        </li>
        <li>
          <strong>Recover or lock the device.</strong> If physical return isn't possible same-day,
          use MDM remote wipe or lock immediately.
        </li>
      </ul>

      <h2 id="day-one-to-seven">Days 1–7: full sweep</h2>
      <p>
        Once the immediate steps are done, run a systematic sweep across every system. The goal is
        zero orphaned access within seven days.
      </p>
      <ul>
        <li>
          <strong>Email and calendar.</strong> Convert or forward the mailbox per your policy.
          Set auto-reply. Transfer calendar ownership for recurring events if needed. Set a
          retention hold before deletion if litigation or compliance requirements apply.
        </li>
        <li>
          <strong>SaaS applications not covered by SSO.</strong> Audit every application the
          person used for a direct login — password managers, billing platforms, development tools,
          GitHub/GitLab organization membership, cloud consoles, vendor portals. These are the
          accounts that fall through the cracks.
        </li>
        <li>
          <strong>Cloud IAM (AWS, Azure, GCP).</strong> Remove IAM user, access keys, and role
          assignments. Check for any personal API keys they may have created. Audit
          recently-generated access keys from their account.
        </li>
        <li>
          <strong>Code repositories.</strong> Remove from GitHub/GitLab org. Audit recent commits
          and any recently added deploy keys or personal access tokens.
        </li>
        <li>
          <strong>Communication platforms.</strong> Slack, Teams, Discord, etc. — deactivate and
          export message history per your retention policy.
        </li>
        <li>
          <strong>File storage.</strong> Transfer ownership of Google Drive / OneDrive / SharePoint
          files to their manager. Review for any data shared externally with personal accounts.
        </li>
        <li>
          <strong>Password manager.</strong> If they had a seat on 1Password or Bitwarden, remove
          them and audit which vaults they had access to. Rotate anything in those vaults that
          could be a shared credential.
        </li>
      </ul>

      <h2 id="privileged-accounts">Special handling: privileged and admin accounts</h2>
      <p>
        If the departing employee had administrative or elevated access, the timeline tightens and
        the scope widens:
      </p>
      <ul>
        <li>Audit all admin actions taken in the last 30 days before departure.</li>
        <li>
          Check for any new accounts, API keys, or permissions created in the final two weeks.
          Backdoor persistence by a disgruntled employee often shows up here.
        </li>
        <li>
          Review any recent changes to firewall rules, security group policies, or access
          control lists.
        </li>
        <li>
          Confirm backup integrity — it's not uncommon for a departing admin to tamper with
          backup configurations.
        </li>
        <li>
          Rotate all service account credentials that the admin had visibility into, even if
          they weren't directly assigned.
        </li>
      </ul>

      <h2 id="documentation">The documentation you need to keep</h2>
      <p>
        Every offboarding should produce a record: who departed, when, what steps were taken,
        by whom, and what exceptions existed (e.g., "mailbox retention hold active, to be removed
        2026-08-01 per legal"). This is your evidence trail for access reviews, audit inquiries,
        and — in a worst case — incident investigations.
      </p>
      <p>
        The record doesn't need to be elaborate. A shared spreadsheet with a row per departure and
        columns for each checklist item is enough to satisfy most auditors and insurance reviewers.
        What they're looking for is that you have a repeatable process and evidence it was followed.
      </p>

      <h2 id="automation">Automating the process</h2>
      <p>
        Manual offboarding checklists get skipped under time pressure, especially for involuntary
        departures. The more of this you can trigger automatically from an HR system event or a
        ticket, the more consistently it gets done.
      </p>
      <p>
        A basic automation — disable Entra ID account, revoke sessions, notify IT team, open a
        ticket with the remaining checklist — can be wired in an afternoon with n8n or Power
        Automate. We build these as part of identity management engagements.
      </p>
    </>
  );
}
