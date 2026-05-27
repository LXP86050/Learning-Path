// Interview prep — question, hint (shown on demand), full answer (shown on second click).

export const interviewPrep = {
  ai: [
    {
      q: 'Explain bias and variance, and how they trade off.',
      hint: 'Think of two failure modes — underfitting and overfitting. One model is too rigid, one too flexible.',
      a: 'Bias is error from a model being too simple to capture the pattern — underfitting. Variance is error from a model being too sensitive to the specific training set — overfitting. Lowering one tends to raise the other; the goal is the sweet spot. You shift the tradeoff with regularisation, more data, or different model complexity.'
    },
    {
      q: 'What is the difference between a generative and a discriminative model?',
      hint: 'One learns the decision boundary; the other can create new samples like the data.',
      a: 'Discriminative models learn P(y|x) directly — they draw boundaries between classes (logistic regression, most classifiers). Generative models learn the joint P(x, y), so they can also sample new x (naive Bayes, GANs, diffusion models, LLMs). Generative is more flexible; discriminative is usually more accurate per unit of data.'
    },
    {
      q: 'Walk me through a Transformer block.',
      hint: 'Six pieces: embedding, attention, residual, layernorm, feed-forward, residual + layernorm again.',
      a: 'Tokens → embeddings + positional encoding → multi-head self-attention (queries, keys, values for each head) → add residual + layer norm → feed-forward network → add residual + layer norm. Stack N of these blocks. Self-attention lets every token attend to every other in one step, which is why Transformers train faster than RNNs.'
    },
    {
      q: 'Why use embeddings + a vector DB instead of putting all your docs into the prompt?',
      hint: 'Context windows are finite, and longer prompts cost money and add latency.',
      a: 'Context windows are limited and expensive, and longer prompts hurt latency and recall. Embeddings map text to vectors; a vector DB retrieves only the top-k semantically similar chunks, so the LLM sees focused, relevant context. That\'s the core RAG idea — and it lets your knowledge base be arbitrarily large.'
    },
    {
      q: 'How would you evaluate an LLM-powered feature?',
      hint: 'Define what "good" means BEFORE you measure. Then sample, score, repeat.',
      a: 'Define task success first. Build a golden set of 30–100 representative cases. Score with rubrics or LLM-as-judge. Track accuracy, hallucination rate, latency, cost, and the user-facing metric (CTR, completion). Run evals in CI so prompt edits get graded before they ship.'
    },
    {
      q: 'What is overfitting and how do you detect it?',
      hint: 'Compare two numbers from training.',
      a: 'A model overfits when it memorises the training set and fails to generalise. The classic signal: training loss keeps dropping while validation loss flattens or rises. Fixes: more data, regularisation (L1/L2, dropout), simpler models, early stopping, augmentation.'
    },
    {
      q: 'Compare fine-tuning, RAG, and prompt engineering.',
      hint: 'Cost, freshness, and what kind of thing you want to change.',
      a: 'Prompt engineering: cheapest, fastest, no training; great for shaping behaviour. RAG: best for fresh or proprietary knowledge — retrieve facts at inference. Fine-tuning: best for style, format, or behaviour the base model can\'t reliably do via prompting; needs labelled data and ongoing maintenance. Real systems usually combine all three.'
    },
    {
      q: 'What is the curse of dimensionality?',
      hint: 'As dimensions grow, "distance" becomes meaningless.',
      a: 'In high dimensions, volume grows exponentially and points become roughly equidistant — distance-based methods (kNN, clustering) lose discriminative power. You\'d need exponentially more data to cover the space. Mitigate with dimensionality reduction (PCA, embeddings) or feature selection.'
    }
  ],
  agentic: [
    {
      q: 'What is the ReAct pattern?',
      hint: 'Two words you keep alternating — one is mental, one physical.',
      a: 'ReAct = Reasoning + Acting. The agent produces a Thought, then an Action (a tool call), then receives an Observation, and loops. Externalising reasoning into the trace improves accuracy and makes the agent debuggable. It\'s the basis of almost every production agent.'
    },
    {
      q: 'When would you NOT use a multi-agent system?',
      hint: 'When the cost outweighs the parallelism.',
      a: 'When a single agent with the right tools can do the job. Multi-agent adds latency, cost, and coordination failure modes. Reach for it when subtasks are genuinely independent (parallel research) or roles must be isolated (specialist with separate context); otherwise one agent + good tools wins.'
    },
    {
      q: 'How do you make an agent\'s output reliable when downstream code consumes it?',
      hint: 'Don\'t let free text reach a parser.',
      a: 'Force structured output (JSON schema or tool calls), validate with Pydantic / zod, retry once with the validation error fed back into the prompt, and have a deterministic fallback. Never regex parse free-text in production.'
    },
    {
      q: 'What is MCP and why does it matter?',
      hint: 'A protocol — like LSP, but for AI tools.',
      a: 'Model Context Protocol is an open standard for connecting AI agents to tools, data, and services through a uniform interface. Instead of bespoke integrations per framework, an MCP server is reusable across any MCP-aware client. It\'s to AI tools what LSP is to editors — write once, plug in anywhere.'
    },
    {
      q: 'How do you evaluate an agent that takes multi-step actions?',
      hint: 'Two levels — process and outcome.',
      a: 'Trajectory level: did it take the right steps, in the right order, with correct tool args? Outcome level: was the final result correct, within budget, on time? Build scripted scenarios, log full traces, grade automatically where possible, human spot-check the rest.'
    },
    {
      q: 'How do you stop an agent from running forever or burning budget?',
      hint: 'Hard limits + human checkpoints + traces.',
      a: 'Hard limits on iteration count, total tool calls, tokens, wall-clock. Per-task cost budgets with circuit breakers. Human-in-the-loop checkpoints for risky actions. Tracing so you can see why it looped — often a tool returning ambiguous output.'
    },
    {
      q: 'Explain the supervisor pattern.',
      hint: 'One agent routes; specialists never talk to each other directly.',
      a: 'A supervisor agent receives the task, decides which specialist (router / coder / researcher / writer) to delegate to, inspects results, and decides whether to route to another specialist or finish. Specialists never call each other — the supervisor owns the control flow, which keeps the system observable and debuggable.'
    },
    {
      q: 'What\'s the biggest source of bugs in agent systems?',
      hint: 'Re-runs don\'t give the same trace.',
      a: 'Non-determinism. Same input, different traces, hard to reproduce. Counter it with: full tracing, recording prompts and seeds, structured outputs everywhere, narrow tool schemas, and offline eval suites so prompt changes can be A/B compared with numbers, not vibes.'
    }
  ],
  fullstack: [
    {
      q: 'What happens when you type a URL and press Enter?',
      hint: 'DNS → TCP/TLS → HTTP → render pipeline.',
      a: 'Browser resolves DNS to an IP, opens a TCP and TLS connection, sends an HTTP request. Server responds with HTML. Browser parses HTML → DOM, fetches CSS/JS/images, builds CSSOM, builds the render tree, lays out, paints, composites. JS hydrates or modifies the DOM after.'
    },
    {
      q: 'Difference between let, const, and var?',
      hint: 'Scope, hoisting, and reassignability.',
      a: 'var is function-scoped and hoisted (initialised undefined). let and const are block-scoped and sit in a temporal dead zone until declared. const prevents reassignment of the binding — though the object it points to can still mutate. Default to const, use let when you must reassign, avoid var.'
    },
    {
      q: 'What is the virtual DOM and why does React use it?',
      hint: 'It\'s about batching and developer ergonomics, not raw speed.',
      a: 'React keeps an in-memory tree of components. On state change it builds a new tree, diffs it against the previous, and applies the minimum DOM mutations. The win is the declarative programming model (UI = f(state)) plus batched updates — the real DOM is still where the actual work happens.'
    },
    {
      q: 'When would you choose SQL over NoSQL?',
      hint: 'Relations and transactions vs flexibility and scale.',
      a: 'SQL for relational data, transactions across tables, strong consistency, complex joins — payments, orders, accounts. NoSQL for flexible schemas, horizontal scale of simple key-value or document access, very high write throughput. Most apps are better served by Postgres than they assume.'
    },
    {
      q: 'Authentication vs authorisation?',
      hint: '"Who are you?" vs "What can you do?".',
      a: 'Authentication verifies identity — passwords, OAuth, passkeys. Authorisation checks permissions for a specific resource. You authenticate once per session and authorise on every protected request.'
    },
    {
      q: 'How does HTTPS work?',
      hint: 'A certificate, a handshake, then symmetric encryption.',
      a: 'Server presents a CA-signed certificate. Client verifies the chain, then both sides perform a key exchange (ECDHE in modern TLS) to derive a shared symmetric key. The rest of the session is encrypted with that key. You get authentication of the server plus confidentiality of the payload.'
    },
    {
      q: 'What are Core Web Vitals?',
      hint: 'Three letters: L, I, C — load, interact, shift.',
      a: 'LCP (Largest Contentful Paint, load), INP (Interaction to Next Paint, responsiveness), CLS (Cumulative Layout Shift, stability). Google\'s user-experience metrics, used in search ranking. Practically, they\'re a good proxy for "does this site feel fast and stable?".'
    },
    {
      q: 'Walk me through deploying a React + Node app to production.',
      hint: 'Containers, CDN, managed DB, CI, observability.',
      a: 'Containerise (or use managed runtimes). Front-end behind a CDN (Vercel/Netlify/CloudFront). API behind a load balancer. DB on a managed service (RDS/Neon/Supabase). CI: lint → test → build → deploy on main. HTTPS via the platform, structured logs to a sink, Sentry for errors, uptime monitor, documented rollback plan.'
    }
  ]
}
