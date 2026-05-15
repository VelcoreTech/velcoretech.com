export default function AiAssistantsForSmb() {
  return (
    <>
      <p className="lead">
        AI assistants are genuinely useful — but only if you deploy them with a clear job to do.
        Most small businesses either skip them entirely ("we're not big enough for AI") or overreach
        ("we're building our own GPT"). Both are wrong. Here's what actually works for teams under
        200 people, and how to get value in weeks rather than quarters.
      </p>

      <h2 id="what-is-an-ai-assistant">What an AI assistant actually is</h2>
      <p>
        An AI assistant is a configured interface to a language model — with a persona, context
        about your business, and a set of tasks it's optimized to handle. It's not a search engine,
        not a database, and not magic. It's a very capable text-processing tool that works best when
        given a specific role.
      </p>
      <p>
        The difference between an AI assistant that saves your team two hours a day and one that
        collects dust is specificity. "A general AI chatbot" is useless. "An assistant that drafts
        client incident summaries in our tone, using our severity framework, and outputs them in the
        format our MSA requires" is something people will actually use.
      </p>

      <h2 id="use-cases">The use cases that actually pay off for SMBs</h2>
      <p>
        Not all AI use cases are equal. These are the ones where we've seen real, measurable return
        for teams in the 10–200 person range:
      </p>
      <ul>
        <li>
          <strong>Internal knowledge retrieval</strong> — "What's our offboarding procedure for
          contractors?" or "What does our MSA say about SLA credits?" An assistant grounded in your
          policies and runbooks answers in seconds. This alone cuts interruptions to senior staff by
          30–50% in our experience.
        </li>
        <li>
          <strong>Draft generation for repetitive communication</strong> — Status updates, incident
          summaries, vendor escalations, client onboarding emails. If your team writes the same
          five templates over and over, an assistant can draft all of them. Staff edits and sends.
        </li>
        <li>
          <strong>Triage and classification</strong> — Routing incoming support tickets, flagging
          high-severity issues, categorizing feedback. A well-configured assistant can reduce first
          response time and free L1 staff for higher-value work.
        </li>
        <li>
          <strong>Meeting and call summarization</strong> — Transcribe, summarize, extract action
          items. This is now table stakes for any team running more than ten meetings a week.
        </li>
        <li>
          <strong>Policy and compliance Q&A</strong> — For teams under audit pressure, an assistant
          trained on your control set can answer auditor questions faster than digging through docs.
        </li>
      </ul>

      <h2 id="what-doesnt-work">What doesn't work (yet)</h2>
      <p>
        AI assistants are not reliable for tasks requiring real-time data, calculations on sensitive
        financial records, or anything where a confident wrong answer creates legal or operational
        risk. Don't use a general assistant to interpret contracts, give tax guidance, or make
        security decisions without a human in the loop.
      </p>
      <p>
        They also don't "know" things automatically. An assistant without grounding — without your
        docs, your policies, your context — will hallucinate confidently. Knowledge base integration
        is not optional; it's what separates a useful assistant from a liability.
      </p>

      <h2 id="build-vs-buy">Build, buy, or configure?</h2>
      <p>
        For most SMBs, the right answer is <strong>configure, not build</strong>. Purpose-built
        assistants like OpenClaw (for internal operations) or Hermes (for client-facing
        communication) are designed to be deployed and grounded quickly — days, not months. They sit
        on top of proven model providers (Claude, OpenAI) with security, rate limiting, and audit
        logging already built in.
      </p>
      <p>
        Building from scratch using the Claude API or OpenAI API makes sense when you have a
        genuinely unique workflow that no existing product covers, and a developer (internal or
        contracted) who can own the integration long-term. It's not a "save money" strategy — it's
        a "we need exactly this behavior" strategy.
      </p>

      <h2 id="security-first">A word on security</h2>
      <p>
        The biggest mistake we see SMBs make with AI assistants is pasting sensitive data into
        consumer AI products — ChatGPT, Claude.ai, Gemini — without understanding the data handling
        implications. Most of these products use input data for model improvement by default unless
        you opt out (or use the API directly with data-protection agreements in place).
      </p>
      <p>
        If your team is handling client data, medical records, legal files, or anything under NDA,
        the assistant needs to run against a model provider with a data processing agreement (DPA)
        and explicit no-training commitments. That's standard with the Anthropic API (Claude) and
        Azure OpenAI, but not with consumer interfaces. This is not a minor detail — it's the
        difference between a useful tool and a compliance incident.
      </p>

      <h2 id="getting-started">How to start this week</h2>
      <p>
        The shortest path to a working AI assistant for most SMBs is three steps:
      </p>
      <ol>
        <li>
          <strong>Pick one job.</strong> Not "AI for everything." One specific, high-frequency task
          where your team spends too much time producing low-variance output.
        </li>
        <li>
          <strong>Gather the context.</strong> Collect the documents, templates, policies, or
          examples the assistant needs to do the job well. Three to ten docs is usually enough to
          start.
        </li>
        <li>
          <strong>Deploy and measure.</strong> Run it for two weeks on the target task, count the
          time saved or errors caught, then decide whether to expand the scope.
        </li>
      </ol>
      <p>
        If you're unsure which task to start with or how to set up the knowledge grounding correctly,
        that's exactly the conversation we have during an AI consultation engagement. Most clients
        leave with a clear first use case and a deployment plan they can execute in under two weeks.
      </p>
    </>
  );
}
