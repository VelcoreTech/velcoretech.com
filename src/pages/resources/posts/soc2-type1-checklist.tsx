export default function Soc2Type1Checklist() {
  return (
    <>
      <p className="lead">
        SOC 2 Type I is the first real milestone on the compliance path for most growing firms — and
        the one most people underestimate. It's not a checklist you hand to an auditor. It's a
        point-in-time opinion that your controls are designed correctly. Here's what that actually
        means, what auditors look for, and how to get there in three to six months without grinding
        your operations team to a halt.
      </p>

      <h2 id="type1-vs-type2">Type I vs. Type II — the honest version</h2>
      <p>
        Type I covers design. An auditor looks at your policies and your controls as they exist on a
        single day and says: "yes, these are suitably designed to meet the criteria." That's it.
        There's no evidence period, no sampling, no proof the controls actually ran for six months.
        Type II covers operating effectiveness over a period — typically three to twelve months — and
        that's what enterprise buyers, cyber insurers, and regulated partners eventually require.
      </p>
      <p>
        Type I is valuable for three reasons: it forces you to actually design and document your
        controls before the audit clock starts, it gives prospects something to share with their
        procurement team while you work toward Type II, and it surfaces gaps you didn't know you had
        before they become findings in a longer engagement.
      </p>

      <h2 id="trust-criteria">The five Trust Service Criteria</h2>
      <p>
        SOC 2 is organized around five criteria. Security (CC) is the only required one. The others
        are optional and should be scoped based on what your customers actually care about.
      </p>
      <ul>
        <li>
          <strong>Security</strong> — Logical and physical access controls, change management,
          incident response, risk assessment, vendor oversight. This is the mandatory core.
        </li>
        <li>
          <strong>Availability</strong> — Uptime commitments, monitoring, incident response tied
          to SLAs. Include if you're providing a service with uptime guarantees.
        </li>
        <li>
          <strong>Confidentiality</strong> — How you identify, handle, and protect confidential
          data. Include if your customers share data they expect you to protect under NDA or contract.
        </li>
        <li>
          <strong>Processing Integrity</strong> — Complete, accurate, and authorized processing.
          Mostly relevant to payroll processors, financial systems, and data pipelines.
        </li>
        <li>
          <strong>Privacy</strong> — Collection, use, retention, and disposal of personal
          information per your privacy notice. Include if you handle consumer PII.
        </li>
      </ul>
      <p>
        For most 50-person B2B firms, the right starting scope is Security + Availability, with
        Confidentiality added if enterprise contracts require it.
      </p>

      <h2 id="what-auditors-check">What auditors actually look at for Type I</h2>
      <p>
        A Type I audit is documentation-heavy. Expect the auditor to request:
      </p>
      <ul>
        <li>Your information security policy and the supporting policies it references (access
        control, incident response, change management, vendor management, acceptable use)</li>
        <li>An asset inventory — what systems are in scope, who owns them</li>
        <li>Access control evidence: how you provision/deprovision accounts, who has admin rights,
        how you enforce MFA</li>
        <li>A risk assessment — even a simple one — showing you identified risks and addressed them</li>
        <li>Vendor/subprocessor list with a description of how you manage their risk</li>
        <li>Incident response and business continuity plans (design, not proof of exercise for Type I)</li>
        <li>Change management policy — how code or configuration changes are approved and deployed</li>
        <li>Background check policy and training acknowledgements for employees with data access</li>
      </ul>

      <h2 id="common-gaps">The four gaps that sink first attempts</h2>

      <h3>1. No documented access review process</h3>
      <p>
        Having MFA and least-privilege in practice is not enough. You need a written procedure that
        says who reviews access, how often, and what happens when someone leaves. Quarterly is the
        typical bar. Most firms do this informally — the auditor needs to see the process on paper
        before they'll credit the control.
      </p>

      <h3>2. Vendor list that stops at Tier 1</h3>
      <p>
        Auditors want to see that you know which vendors process or could access your customer data,
        not just your primary cloud provider. SaaS tools used by your operations team count. A simple
        spreadsheet with vendor name, data accessed, SOC 2 status, and your review date is enough —
        but it has to exist.
      </p>

      <h3>3. Incident response plan that's never been tested</h3>
      <p>
        For Type I, untested is acceptable — the auditor is checking design, not performance. But
        "we'll email each other" is not a plan. The plan needs to define severity levels, escalation
        paths, communication timelines, and a post-incident review step. One page done is worth
        more than ten pages in progress.
      </p>

      <h3>4. Change management that lives in someone's head</h3>
      <p>
        "We review all changes before they go out" is not a control. The auditor wants a process:
        what requires approval, who approves it, how approvals are recorded (Jira, GitHub PRs, a
        ticket, anything traceable). If your current process is informal, spend two weeks
        documenting it as-is before trying to improve it. You can formalize later.
      </p>

      <h2 id="timeline">Realistic timeline for a 50-person firm</h2>
      <ul>
        <li><strong>Month 1:</strong> Scope definition, gap assessment, asset inventory. Identify
        which criteria to include and what's missing.</li>
        <li><strong>Month 2–3:</strong> Policy drafting and control implementation. Write what doesn't
        exist. Fix the gaps. Don't try to be perfect — aim for defensible and consistent.</li>
        <li><strong>Month 4:</strong> Internal readiness review. Walk through the auditor's request
        list yourself before they do. Every missing item adds a week.</li>
        <li><strong>Month 5–6:</strong> Auditor fieldwork and report. Type I engagements typically
        run four to six weeks of active auditor time.</li>
      </ul>
      <p>
        Total elapsed time: three to six months, depending on how much exists already and how quickly
        your team can move on documentation. Organizations with zero security documentation should
        budget toward the six-month end.
      </p>

      <h2 id="next-steps">Where to start</h2>
      <p>
        The most useful first step isn't picking an auditor — it's doing an honest gap assessment
        against the Security criteria. Map what you have today against the CC series (CC6 for
        logical access, CC7 for system operations, CC8 for change management, CC9 for risk
        mitigation) and you'll have a concrete list of what needs to be built before the clock
        starts.
      </p>
      <p>
        Our IT and Security Assessment covers the controls relevant to SOC 2 readiness as part of
        its standard output — it's a fast way to get that gap list without engaging an auditor
        before you're ready.
      </p>
    </>
  );
}
