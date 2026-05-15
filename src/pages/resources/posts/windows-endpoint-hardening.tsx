export default function WindowsEndpointHardening() {
  return (
    <>
      <p className="lead">
        Most SMB endpoint security looks like antivirus plus hope. That's not a security posture —
        it's a gap waiting to become an incident. This is the baseline we deploy on every Windows
        endpoint we manage: the controls that catch real attacks, close the gaps that matter, and
        don't require an enterprise budget or a full-time security team to maintain.
      </p>

      <h2 id="why-endpoints-matter">Why endpoints are still the primary attack surface</h2>
      <p>
        Despite years of cloud-security focus, the endpoint remains where most incidents start.
        Phishing lands a malicious attachment. A browser exploit drops a stager. A user installs
        something they shouldn't. Credential theft via info-stealer malware. In every case, the
        attacker's first foothold is a workstation or laptop.
      </p>
      <p>
        Endpoint hardening doesn't prevent every attack — nothing does. What it does is raise the
        cost of compromise, contain lateral movement, and generate the telemetry needed to detect
        and respond when something does land.
      </p>

      <h2 id="local-admin">Local administrator rights: the first control to get right</h2>
      <p>
        Giving users local administrator rights is the single most common endpoint misconfiguration
        we find. It's tempting — it reduces IT tickets when users need to install something. The
        cost is that any malware the user encounters immediately has admin context, can install
        persistence, modify defenses, and move laterally using the local admin account.
      </p>
      <p>
        The fix is standard user accounts for all day-to-day work. When someone legitimately needs
        to install software, IT approves and deploys it. For edge cases, a Just-In-Time local admin
        solution (Windows LAPS is now free and built into the OS) provides temporary elevation with
        an audit trail.
      </p>
      <p>
        We set this control first on every engagement. The resistance from users is real but brief.
        The security gain is substantial.
      </p>

      <h2 id="attack-surface-reduction">Attack Surface Reduction rules</h2>
      <p>
        Microsoft Defender includes a set of Attack Surface Reduction (ASR) rules that block
        specific malicious behavior patterns — not signatures, but behaviors. These are among the
        most underused controls in the Windows security toolkit.
      </p>
      <p>Key rules to enable:
      </p>
      <ul>
        <li>
          <strong>Block Office applications from creating child processes</strong> — Stops macro
          malware from spawning PowerShell, cmd.exe, or other execution paths. This alone blocks
          the majority of document-based phishing payloads.
        </li>
        <li>
          <strong>Block execution of potentially obfuscated scripts</strong> — Catches PowerShell
          and JavaScript-based loaders that obfuscate their code to evade signature detection.
        </li>
        <li>
          <strong>Block credential stealing from the Windows local security authority</strong> —
          Prevents LSASS memory dumping, which is how tools like Mimikatz steal credentials.
        </li>
        <li>
          <strong>Block process creations originating from PSExec and WMI commands</strong> —
          Limits lateral movement techniques used in most ransomware campaigns.
        </li>
        <li>
          <strong>Block untrusted and unsigned processes from USB</strong> — Basic protection
          against USB-based execution and physical access attacks.
        </li>
      </ul>
      <p>
        We start ASR rules in Audit mode for two weeks, review the telemetry for false positives,
        then move to Block. Jumping straight to Block without auditing first breaks workflows and
        creates a reputation for security controls as "the thing that breaks stuff."
      </p>

      <h2 id="application-control">Application control</h2>
      <p>
        The most effective control for preventing malware execution is application control: only
        allow known, approved software to run. Windows supports this via AppLocker (basic) and
        Windows Defender Application Control (advanced).
      </p>
      <p>
        For SMBs, AppLocker in allowlist mode for script execution (PowerShell, VBScript, Windows
        Script Host) is the highest-value starting point. Blocking script execution from user
        temp directories and the Downloads folder alone stops a large percentage of phishing-based
        malware delivery.
      </p>
      <p>
        Full executable allowlisting is more complex and requires investment in maintaining the
        allowed application list. We typically phase this in after the foundational controls are
        stable.
      </p>

      <h2 id="patch-governance">Patch governance</h2>
      <p>
        Unpatched systems are the most reliably exploited attack surface in SMB environments.
        Not because zero-days are common, but because attackers use known CVEs from months or years
        ago — because they know unpatched systems exist.
      </p>
      <p>
        A defensible patch posture requires:
      </p>
      <ul>
        <li>
          <strong>Defined windows:</strong> When patches deploy (not "whenever"), with a maximum
          time-to-deploy for critical patches (we use 7 days for CVSS 9+, 30 days for others).
        </li>
        <li>
          <strong>Coverage tracking:</strong> You need to know which endpoints have successfully
          applied patches — not just that patches were pushed.
        </li>
        <li>
          <strong>Third-party application patching:</strong> Windows Update patches the OS.
          Chrome, Zoom, Adobe, and every other third-party app needs a separate mechanism. This is
          where most orgs have gaps.
        </li>
        <li>
          <strong>EOL device policy:</strong> Any device running an OS version past end-of-support
          represents a permanent unpatched surface. Track these and have a replacement plan.
        </li>
      </ul>

      <h2 id="logging-and-telemetry">Logging and telemetry</h2>
      <p>
        You cannot detect what you don't log. The minimum endpoint logging posture for a defensible
        environment:
      </p>
      <ul>
        <li>
          <strong>Windows Event Log:</strong> Enable PowerShell script block logging and module
          logging. Enable process creation events (Event ID 4688 with command line). Forward logs
          to a central collector.
        </li>
        <li>
          <strong>EDR telemetry:</strong> If you're using Microsoft Defender for Endpoint (included
          in M365 Business Premium), enable advanced hunting and ensure alerts route to someone who
          reads them.
        </li>
        <li>
          <strong>Authentication events:</strong> Log-on successes and failures, privilege
          escalations, account modifications. These are your breach indicators.
        </li>
      </ul>
      <p>
        Logging without a review process is theater. The telemetry needs to go somewhere and be
        looked at by someone on a defined cadence. This is the bridge between endpoint hardening
        and a monitoring posture.
      </p>

      <h2 id="what-this-looks-like">What this looks like in practice</h2>
      <p>
        A full baseline deployment — standard user accounts, ASR rules in production, PowerShell
        application control, patch governance, and logging — takes roughly one to two weeks to
        deploy across a 50-person organization, including the audit period for ASR rules. It
        requires Microsoft Intune (or a similar MDM) and either Microsoft Defender for Endpoint or
        a third-party EDR.
      </p>
      <p>
        The result is an endpoint posture that would have stopped the majority of SMB-targeted
        ransomware campaigns from the last three years — not all of them, but most. Combined with
        identity controls (MFA, conditional access) and email filtering, you've removed the
        majority of the attack surface that real attackers actually use against companies your size.
      </p>
    </>
  );
}
