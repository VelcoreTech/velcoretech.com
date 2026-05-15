export default function RagVsFinetuning() {
  return (
    <>
      <p className="lead">
        When companies want to make an AI model "know" their business, two approaches come up in
        every conversation: Retrieval-Augmented Generation (RAG) and fine-tuning. They sound
        similar, but they solve different problems. Getting this choice wrong costs months and money.
        Here's the honest breakdown.
      </p>

      <h2 id="the-core-difference">The core difference</h2>
      <p>
        <strong>RAG</strong> keeps the base model unchanged. Instead, when a user asks a question,
        the system retrieves relevant chunks from your documents and injects them into the prompt as
        context. The model then answers using both its pretrained knowledge and the retrieved
        material. The model never "learns" your data — it reads it fresh on each query.
      </p>
      <p>
        <strong>Fine-tuning</strong> modifies the model itself. You run additional training on
        examples of your data, and the model's weights change to reflect that. The resulting model
        "knows" things at a parametric level — not by looking them up, but because they're baked in.
      </p>
      <p>
        The practical implication: RAG is good at surfacing specific information from a living
        knowledge base. Fine-tuning is good at teaching the model a new style, tone, format, or
        domain-specific reasoning pattern.
      </p>

      <h2 id="when-to-use-rag">When RAG is the right choice</h2>
      <p>
        RAG is the right choice for almost every SMB AI project involving knowledge retrieval. That
        includes:
      </p>
      <ul>
        <li>
          <strong>Internal documentation Q&A</strong> — Your runbooks, policies, SOPs, and
          contracts change regularly. Fine-tuning can't keep up; a RAG pipeline reads the latest
          version on every query.
        </li>
        <li>
          <strong>Customer support grounding</strong> — Your product docs, FAQ, pricing, and
          support history. RAG lets you update the knowledge base without touching the model.
        </li>
        <li>
          <strong>Compliance and audit assistance</strong> — Pulling specific clauses from policies,
          control frameworks, or evidence files. Exact text retrieval is what RAG does well.
        </li>
        <li>
          <strong>Multi-tenant knowledge separation</strong> — Different clients or departments can
          have isolated knowledge stores retrieved into the same base model.
        </li>
      </ul>
      <p>
        RAG is also faster to deploy, cheaper to maintain, and easier to debug. When the model gives
        a wrong answer, you can trace it back to a specific retrieved chunk and fix the source doc.
        With fine-tuning, a wrong answer is harder to root-cause — it may be a training artifact,
        a data quality issue, or an edge case the training set didn't cover.
      </p>

      <h2 id="when-to-use-finetuning">When fine-tuning actually makes sense</h2>
      <p>
        Fine-tuning is appropriate when you need to change <em>how</em> the model behaves, not just
        what it knows. Specific cases where it earns its cost:
      </p>
      <ul>
        <li>
          <strong>Brand voice and tone</strong> — You want the model to write exactly in your
          house style, with consistent vocabulary and persona, without requiring extensive prompt
          engineering on every call.
        </li>
        <li>
          <strong>Structured output consistency</strong> — If you need the model to always return
          a specific JSON schema or report format, fine-tuning on examples can outperform
          instruction prompting, especially for edge cases.
        </li>
        <li>
          <strong>Domain-specific reasoning</strong> — Medical coding, legal classification,
          specialized technical diagnosis. If the reasoning pattern itself is domain-specific and
          not well-represented in the base model, fine-tuning on expert-labeled examples helps.
        </li>
        <li>
          <strong>Latency reduction</strong> — A fine-tuned smaller model can match the quality
          of a larger prompted model at lower latency and cost — relevant for high-volume, real-time
          applications.
        </li>
      </ul>
      <p>
        Fine-tuning is not appropriate when your "training data" is a folder of internal docs.
        That's what RAG is for. Fine-tuning requires labeled examples of inputs and correct outputs
        — typically hundreds to thousands of high-quality pairs — and produces a model that captures
        patterns, not facts.
      </p>

      <h2 id="the-hybrid-approach">The hybrid approach</h2>
      <p>
        The most capable production AI systems use both. A fine-tuned model handles tone, output
        format, and domain reasoning. A RAG layer supplies current, specific, accurate information
        at query time. The fine-tuning handles style and structure; the retrieval handles facts.
      </p>
      <p>
        For SMBs, start with RAG. It's lower-cost, faster to deploy, and handles 80% of knowledge
        retrieval use cases without any model training. Once you have a working RAG pipeline and
        you've identified specific behaviors the base model doesn't handle consistently, then
        evaluate fine-tuning for that narrow gap.
      </p>

      <h2 id="cost-reality">Cost reality check</h2>
      <p>
        A RAG pipeline for a 50-person team — with a knowledge base of several hundred documents,
        reasonable query volume, and a hosted model provider — typically runs $50–$300/month in API
        costs, plus a one-time setup investment of one to four weeks of engineering time.
      </p>
      <p>
        Fine-tuning a frontier model (GPT-4o, Claude Opus) costs thousands of dollars per training
        run, requires expert data curation, and needs to be re-run every time your underlying data
        changes significantly. Fine-tuning a smaller open-source model (Mistral, Llama) is cheaper
        per run but requires infrastructure to host and serve the model.
      </p>
      <p>
        For most SMBs, the ROI math for fine-tuning doesn't close until you have a very specific,
        high-volume use case where the incremental quality gain justifies the cost. RAG almost
        always gets you there first.
      </p>
    </>
  );
}
