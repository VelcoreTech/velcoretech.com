export default function AiWorkflowAutomationStarter() {
  return (
    <>
      <p className="lead">
        Most AI automation guides assume a full engineering team, a six-month roadmap, and a budget
        that would scare a CFO. This one doesn't. These are five automations any SMB can deploy
        this week using tools you probably already pay for — and each one compounds over time.
      </p>

      <h2 id="what-we-mean">What "AI workflow automation" actually means here</h2>
      <p>
        We're not talking about building a model or writing Python from scratch. We're talking about
        connecting existing AI capabilities (Claude, ChatGPT, Gemini) to the workflows your team
        already runs — via tools like n8n, Zapier, or Make — so that a trigger fires, AI does the
        heavy text work, and the output lands where your team needs it.
      </p>
      <p>
        The pattern is always: <strong>trigger → enrich with AI → deliver to destination.</strong>
        Once you understand that, almost any repetitive text-based task becomes automatable.
      </p>

      <h2 id="automation-1">1. Support ticket triage and routing</h2>
      <p>
        <strong>The problem:</strong> New tickets come in with no context, no category, no
        priority — and someone has to read each one and route it manually.
      </p>
      <p>
        <strong>The automation:</strong> When a new ticket arrives (via email, form, or helpdesk
        webhook), an AI node classifies the issue type, assigns a severity level based on your
        criteria, drafts a first-response acknowledgment, and routes the ticket to the right queue.
        Staff review and send; they don't triage.
      </p>
      <p>
        <strong>Tools:</strong> n8n or Zapier + Claude or OpenAI API + your helpdesk (Freshdesk,
        Zendesk, HubSpot, or even an email inbox with labels).
      </p>
      <p>
        <strong>Time to deploy:</strong> 3–5 hours if your helpdesk has a webhook or Zapier
        integration. One afternoon.
      </p>

      <h2 id="automation-2">2. Incident summary generation</h2>
      <p>
        <strong>The problem:</strong> Every incident requires a summary for the client — what
        happened, when, what was affected, what was done, what's next. Writing these under pressure
        takes 30–45 minutes per incident and the quality is inconsistent.
      </p>
      <p>
        <strong>The automation:</strong> A form or Slack command captures the key facts (start time,
        affected systems, timeline, resolution steps). The AI takes that structured input and
        generates a client-facing summary in your tone and format. Your engineer reviews, edits if
        needed, and sends.
      </p>
      <p>
        <strong>Tools:</strong> Typeform or a Slack slash command → n8n → Claude API →
        email or Notion.
      </p>
      <p>
        <strong>Time to deploy:</strong> 2–4 hours.
      </p>

      <h2 id="automation-3">3. Meeting action item extraction</h2>
      <p>
        <strong>The problem:</strong> Meetings end, people have different memories of what was
        decided, and action items either live in someone's notes or don't get tracked at all.
      </p>
      <p>
        <strong>The automation:</strong> Your meeting platform (Zoom, Teams, Google Meet) produces
        a transcript. An automation pulls the transcript, sends it to an AI for summarization and
        action item extraction, and posts the output to Slack, Notion, or wherever your team tracks
        work. Owner and deadline fields are extracted if mentioned.
      </p>
      <p>
        <strong>Tools:</strong> Otter.ai, Fireflies, or native meeting transcription → Zapier →
        Claude or GPT-4o → Slack or Notion.
      </p>
      <p>
        <strong>Time to deploy:</strong> 2–3 hours.
      </p>

      <h2 id="automation-4">4. Inbound lead qualification and response</h2>
      <p>
        <strong>The problem:</strong> Contact form submissions vary wildly in quality. Some are
        ready to buy, some are students doing research, some are spam. Someone has to read each one
        and write a first response.
      </p>
      <p>
        <strong>The automation:</strong> When a form submission arrives, AI scores the lead against
        your qualification criteria (company size, expressed need, timeline), drafts a personalized
        first response for high-scoring leads, and sends a standard "we'll follow up" message to
        others. Sales only sees qualified leads with a ready-to-edit draft response.
      </p>
      <p>
        <strong>Tools:</strong> Contact form webhook → n8n → Claude API → CRM + email draft.
      </p>
      <p>
        <strong>Time to deploy:</strong> 4–6 hours, depending on CRM integration complexity.
      </p>

      <h2 id="automation-5">5. Weekly operations digest</h2>
      <p>
        <strong>The problem:</strong> Leadership wants a weekly status update. Someone has to pull
        data from multiple tools, summarize it, and write it up every Friday afternoon.
      </p>
      <p>
        <strong>The automation:</strong> A scheduled trigger fires every Friday morning, pulling
        structured data from your helpdesk (ticket volume, SLA performance), project tracker (tasks
        closed, blocked items), and any other data sources with APIs. AI turns that structured data
        into a narrative summary with flagged exceptions. The draft hits your email by noon —
        you edit and send.
      </p>
      <p>
        <strong>Tools:</strong> n8n scheduled trigger → API calls to your tools → Claude for
        summarization → email.
      </p>
      <p>
        <strong>Time to deploy:</strong> 4–8 hours, plus time to identify which data sources
        have APIs.
      </p>

      <h2 id="getting-started">How to actually start</h2>
      <p>
        Pick the one automation above where your team loses the most time right now. Don't try to
        deploy all five at once. Build one, run it for two weeks, measure the time saved, and use
        that win to justify the next one.
      </p>
      <p>
        If you want to skip the setup work and get a working automation without the "why isn't this
        webhook firing" debugging session, that's the kind of engagement we run in a day or two —
        scoped to one specific workflow, documented so your team can maintain it.
      </p>
    </>
  );
}
