// Curriculum for the three tracks. Each path teaches from scratch and has a
// 4-week program plus an interview-prep question bank.

export const paths = {
  ai: {
    id: 'ai',
    title: 'AI Engineer',
    tagline: 'From the math of a neuron to deploying production LLM systems.',
    summary:
      'Build the foundations of machine learning, deep learning, and modern LLM engineering. No prior ML experience required — we start from linear algebra and finish shipping a retrieval-augmented chatbot.',
    icon: '🧠',
    color: ['#7c5cff', '#22d3ee'],
    tags: ['Python', 'PyTorch', 'LLMs', 'RAG', 'Vector DBs'],
    stats: { duration: '4 weeks', hours: '~10 hrs / week', projects: 6, level: 'Beginner → Intermediate' },
    weeks: [
      {
        week: 1,
        title: 'Foundations: Math, Python & ML Intuition',
        subtitle: 'Set up the runway',
        topics: [
          'Linear algebra essentials — vectors, matrices, dot products (3Blue1Brown intuition first, formulas second).',
          'Calculus quick tour — derivatives, gradients, chain rule. Just enough to read a backprop diagram.',
          'Probability & statistics — Bayes rule, distributions, expectation, variance.',
          'Python for ML — NumPy arrays, broadcasting, vectorisation; Pandas data frames; Matplotlib basics.',
          'Your first model — fit a linear regression by hand, then with scikit-learn.'
        ],
        project: 'Predict housing prices with linear regression on the California Housing dataset.'
      },
      {
        week: 2,
        title: 'Classical ML & The Bias–Variance Story',
        subtitle: 'Learn how models actually learn',
        topics: [
          'Supervised vs unsupervised vs reinforcement — when to use what.',
          'Loss functions, gradient descent, learning rate intuition with animated demos.',
          'Decision trees, random forests, gradient boosting (XGBoost / LightGBM).',
          'Train/val/test splits, cross-validation, leakage, and the bias–variance tradeoff.',
          'Feature engineering: scaling, encoding, embeddings as features.'
        ],
        project: 'Kaggle-style classifier on the Titanic dataset — beat the public baseline.'
      },
      {
        week: 3,
        title: 'Deep Learning & Transformers',
        subtitle: 'Build a brain, then a language model',
        topics: [
          'Neurons → MLPs → backpropagation. Train a network from scratch in NumPy.',
          'PyTorch tour — tensors, autograd, nn.Module, DataLoader, training loop template.',
          'CNNs for vision, RNNs for sequences (briefly), then the Transformer block.',
          'Attention is all you need — q/k/v, multi-head, positional encoding, residual + layernorm.',
          'Fine-tuning a pretrained Transformer (DistilBERT) for sentiment classification.'
        ],
        project: 'Fine-tune DistilBERT to classify movie reviews; deploy as a FastAPI endpoint.'
      },
      {
        week: 4,
        title: 'LLM Engineering in Production',
        subtitle: 'Ship something people can use',
        topics: [
          'Prompting techniques — zero-shot, few-shot, chain-of-thought, system prompts.',
          'Embeddings + vector databases (FAISS, pgvector, Pinecone) and similarity search.',
          'Retrieval-Augmented Generation (RAG): chunking, embedding, retrieve, ground, answer.',
          'Evaluation — golden sets, LLM-as-judge, latency / cost / quality tradeoffs.',
          'Observability and guardrails — tracing, prompt versioning, PII redaction.'
        ],
        project: 'Build a RAG chatbot over your own PDFs — Streamlit UI + FastAPI + pgvector.'
      }
    ]
  },

  agentic: {
    id: 'agentic',
    title: 'Agentic Engineer',
    tagline: 'Design AI agents that reason, use tools, and complete real work.',
    summary:
      'Go beyond chat completions. Learn how to engineer agents that plan, call tools, recover from failure, and coordinate in teams — the most in-demand AI skill of 2026.',
    icon: '🤖',
    color: ['#22d3ee', '#4ade80'],
    tags: ['LangGraph', 'Tool use', 'MCP', 'Eval', 'Multi-agent'],
    stats: { duration: '4 weeks', hours: '~9 hrs / week', projects: 5, level: 'Some Python helpful' },
    weeks: [
      {
        week: 1,
        title: 'Prompting & The Anatomy of an Agent',
        subtitle: 'Talk to models like an engineer',
        topics: [
          'How LLMs really work — tokens, context windows, sampling temperature, stop sequences.',
          'Prompt patterns: role + task + context + format. Few-shot vs zero-shot.',
          'Reasoning patterns — ReAct loops (Thought → Action → Observation), reflection, plan-then-execute.',
          'Anatomy of an agent: model + tools + memory + control loop.',
          'Hello-agent — build a single-tool agent that answers questions using a search function.'
        ],
        project: 'A web-search agent that answers current-events questions with cited sources.'
      },
      {
        week: 2,
        title: 'Tool Use, Structured Output & MCP',
        subtitle: 'Give your agent hands',
        topics: [
          'Function calling / tool-use APIs (OpenAI, Anthropic) — schemas, validation, parallel tools.',
          'Structured output with JSON schemas and Pydantic — fail loudly on malformed responses.',
          'Model Context Protocol (MCP) — connecting agents to filesystems, databases, APIs through a standard interface.',
          'Managing state: short-term memory, scratchpads, conversation summarisation.',
          'Error handling — retries, fallbacks, when to ask the user vs guess.'
        ],
        project: 'A code-review agent that reads a GitHub PR via MCP and posts inline comments.'
      },
      {
        week: 3,
        title: 'Graphs, Planning & Long-Horizon Tasks',
        subtitle: 'Beyond a single loop',
        topics: [
          'LangGraph & state machines — modelling agents as nodes and edges, not just chains.',
          'Planner + executor patterns. When to plan top-down vs let the agent improvise.',
          'Subagents and delegation — when to spawn a focused agent vs keep going.',
          'Long-term memory: vector recall, episodic memory, knowledge graphs.',
          'Human-in-the-loop checkpoints — approvals, edits, interrupts.'
        ],
        project: 'A research-assistant agent that plans a literature review, delegates to subagents, and writes a markdown report.'
      },
      {
        week: 4,
        title: 'Evaluation, Safety & Multi-Agent Systems',
        subtitle: 'Ship agents you can trust',
        topics: [
          'Evals for agents — task success, tool-call correctness, cost, latency, trajectory grading.',
          'Tracing with LangSmith / Langfuse / OpenTelemetry — debugging non-deterministic flows.',
          'Guardrails: input filters, output validators, sandboxed tool execution, rate limits.',
          'Multi-agent orchestration — supervisor patterns, debate, role specialisation, when NOT to use multi-agent.',
          'Deployment — async queues, serverless workers, autoscaling, cost controls.'
        ],
        project: 'A multi-agent customer-support bot with router → specialist agents → QA reviewer, deployed on a queue.'
      }
    ]
  },

  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    tagline: 'Become someone who can build, ship, and run a complete web app.',
    summary:
      'A no-fluff path from HTML/CSS basics to a deployed full-stack app with auth, a database, and a CI pipeline. Every week ends with something live on the internet.',
    icon: '🛠️',
    color: ['#f472b6', '#7c5cff'],
    tags: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Postgres', 'Cloud'],
    stats: { duration: '4 weeks', hours: '~12 hrs / week', projects: 7, level: 'Complete beginner OK' },
    weeks: [
      {
        week: 1,
        title: 'The Web Platform from Zero',
        subtitle: 'HTML, CSS, JS in your head, not just your editor',
        topics: [
          'How the web works — DNS, HTTP, request/response, the browser render pipeline.',
          'Semantic HTML, accessibility basics, and the document outline.',
          'Modern CSS — the box model, flexbox, grid, custom properties, container queries.',
          'JavaScript fundamentals — values, types, control flow, functions, scope, closures.',
          'The DOM and events — building UI without a framework first.'
        ],
        project: 'A responsive personal landing page with a working contact form (no backend yet) — deployed to GitHub Pages.'
      },
      {
        week: 2,
        title: 'Modern JS & React',
        subtitle: 'From DOM-poking to component thinking',
        topics: [
          'ES2020+ JavaScript — let/const, arrow funcs, destructuring, spread, modules, async/await.',
          'Build tools — Vite, npm, package.json, dev vs prod builds (without the magic).',
          'React mental model — components, props, state, the render cycle, keys.',
          'Hooks deep dive — useState, useEffect, useMemo, useRef, custom hooks.',
          'Forms, lists, routing (react-router or hash routing), and basic CSS-in-component patterns.'
        ],
        project: 'A weather dashboard that fetches a public API, with search, favourites, and dark mode.'
      },
      {
        week: 3,
        title: 'Backend, APIs & Databases',
        subtitle: 'Make the server side click',
        topics: [
          'Node.js + Express (or Fastify) — routes, middleware, error handling.',
          'REST design — resources, status codes, idempotency, pagination, versioning.',
          'SQL fundamentals with Postgres — schema design, joins, indexes, transactions.',
          'ORMs (Prisma or Drizzle) vs raw SQL — when each makes sense.',
          'Authentication — sessions vs JWT, password hashing, OAuth basics, securing routes.'
        ],
        project: 'A full-stack task tracker — React front end, Express API, Postgres, JWT auth, deployed on Render or Fly.io.'
      },
      {
        week: 4,
        title: 'Production: Deploy, Monitor, Iterate',
        subtitle: 'Operate what you build',
        topics: [
          'Docker basics — images, containers, multi-stage builds, docker-compose for local dev.',
          'CI/CD with GitHub Actions — lint, test, build, deploy on every push.',
          'Cloud primitives — Vercel / Netlify for front, Render / Fly / Railway / AWS for back.',
          'Observability — structured logging, error tracking (Sentry), basic metrics.',
          'Performance — Core Web Vitals, lazy loading, caching, CDN, simple load testing.'
        ],
        project: 'Ship your task tracker for real — custom domain, HTTPS, CI on main, Sentry hooked up, runbook in README.'
      }
    ]
  }
}

export const interviewPrep = {
  ai: [
    { q: 'Explain bias and variance, and how they trade off.', a: 'Bias is error from incorrect assumptions in the model (underfitting). Variance is error from sensitivity to small fluctuations in the training set (overfitting). Lowering one often raises the other — the goal is finding the sweet spot, typically via regularisation, more data, or better-suited model complexity.' },
    { q: 'What is the difference between a generative and a discriminative model?', a: 'A discriminative model learns P(y|x) — the decision boundary directly (e.g. logistic regression). A generative model learns P(x, y) and can generate new samples (e.g. naive Bayes, GANs, diffusion models). Generative models are more flexible but typically harder to train and need more data.' },
    { q: 'Walk me through how a Transformer block works.', a: 'Input tokens → embeddings + positional encoding → multi-head self-attention (each head computes attention from queries/keys/values, then heads are concatenated) → residual add + layer norm → feed-forward network → residual add + layer norm. The same block is stacked N times. Self-attention lets every token attend to every other token in one step, replacing recurrence.' },
    { q: 'Why use embeddings + a vector DB instead of putting all your docs into the prompt?', a: 'Context windows are limited and expensive, and longer prompts hurt latency and recall. Embeddings map text to a fixed-size vector; a vector DB retrieves only the most semantically similar chunks (typically top-k) so the LLM gets focused, relevant context. This is the core of RAG.' },
    { q: 'How would you evaluate an LLM-powered feature?', a: 'Define task success first (does the output do what the user wants?). Build a small but representative golden set, score with rubrics or LLM-as-judge, and track accuracy, hallucination rate, latency, cost, and user-facing metrics (CTR, completion). Run evals in CI so regressions are caught before deploy.' },
    { q: 'What is overfitting and how do you detect it?', a: 'Overfitting is when a model memorises training data and fails to generalise. Detect it by a large gap between training and validation loss/accuracy. Mitigate with more data, regularisation (L1/L2, dropout), simpler models, early stopping, or data augmentation.' },
    { q: 'Compare fine-tuning, RAG, and prompt engineering.', a: 'Prompt engineering: cheapest, fastest, no training; great for behaviour shaping. RAG: best when you need fresh or proprietary knowledge — retrieve the facts at inference time. Fine-tuning: best when you need style, format, or behaviour the base model can\'t reliably do via prompting; needs labelled data and ongoing maintenance. Often combined.' },
    { q: 'What is the curse of dimensionality?', a: 'As dimensions grow, the volume of the space grows exponentially and points become uniformly far apart. Distance-based methods (kNN, clustering) lose discriminative power and you need exponentially more data to cover the space. Mitigate with dim reduction (PCA, embeddings) or feature selection.' }
  ],
  agentic: [
    { q: 'What is the ReAct pattern?', a: 'ReAct interleaves Reasoning and Acting. The agent produces a Thought (free-text reasoning), then an Action (a tool call), receives an Observation, and loops until it answers. Externalising reasoning into the trace improves accuracy and makes the agent debuggable.' },
    { q: 'When would you NOT use a multi-agent system?', a: 'When a single agent with the right tools and a good prompt can do the job. Multi-agent adds latency, cost, and coordination failure modes. Use it when subtasks are genuinely independent (parallel research), require specialised contexts, or benefit from adversarial review.' },
    { q: 'How do you make an agent\'s output reliable when downstream code depends on it?', a: 'Force structured output (JSON schema or tool calls), validate with a schema (Pydantic / zod), retry with the validation error fed back into the prompt, and have a deterministic fallback. Never parse free-text in production code paths.' },
    { q: 'What is MCP and why does it matter?', a: 'Model Context Protocol is an open standard for connecting AI agents to tools, data, and services through a common interface. Instead of bespoke integrations per agent framework, an MCP server (e.g. for Postgres, GitHub, a filesystem) is reusable across any MCP-aware client. It is to AI tools what LSP is to editors.' },
    { q: 'How do you evaluate an agent that takes multi-step actions?', a: 'Evaluate at two levels. Trajectory-level: did it take the right steps in the right order, and were tool calls correct? Outcome-level: was the final result correct, on time, and under budget? Build a small set of scripted scenarios, log full traces, and grade with rubrics — automate where possible, human-spot-check where not.' },
    { q: 'How would you stop an agent from running forever or burning budget?', a: 'Hard limits on iteration count, total tool calls, tokens, and wall-clock time. Cost budgets per task with circuit breakers. Human-in-the-loop checkpoints for high-risk actions. Tracing so you can see WHY it looped (often it\'s a tool returning ambiguous output).' },
    { q: 'Explain the supervisor pattern in multi-agent systems.', a: 'A supervisor agent receives the task, decides which specialist (router / coder / researcher / writer) to delegate to, calls them, inspects results, and decides whether to route to another specialist or finish. Specialists never call each other directly — the supervisor owns the control flow, which keeps the system observable.' },
    { q: 'What is the biggest source of bugs in agent systems?', a: 'Non-determinism. The same input produces different traces, so reproducing bugs is hard. Counter it with: tracing every call, recording prompts and seeds, structured outputs everywhere, narrow tool definitions, and offline eval suites so changes can be A/B compared.' }
  ],
  fullstack: [
    { q: 'What happens when you type a URL into a browser and press Enter?', a: 'Browser resolves DNS to an IP, opens a TCP (and TLS) connection, sends an HTTP request. The server responds with HTML. The browser parses HTML → builds the DOM, fetches subresources (CSS, JS, images), builds the CSSOM and render tree, lays out, paints, and composites. JavaScript can then hydrate or modify the DOM.' },
    { q: 'Explain the difference between let, const, and var.', a: 'var is function-scoped and hoisted (initialised to undefined). let and const are block-scoped and live in a temporal dead zone until declared. const prevents reassignment of the binding (the object it points to can still be mutated). Default to const, use let when you must reassign, avoid var.' },
    { q: 'What is the virtual DOM and why does React use it?', a: 'React keeps an in-memory tree of components. On state change it builds a new tree and diffs it against the previous one, then applies the minimal set of real DOM mutations. The win is developer experience (declarative UI) and batching, not raw speed — the real DOM is still doing the work.' },
    { q: 'When would you choose SQL over NoSQL?', a: 'SQL when you have relational data, strong consistency, complex joins, or transactions across tables — e.g. payments, orders, user accounts. NoSQL when you need flexible schemas, horizontal scale of simple key-value or document access, or very high write throughput. Most apps are better served by Postgres than they think.' },
    { q: 'What is the difference between authentication and authorization?', a: 'Authentication answers "who are you?" — verifying identity (password, OAuth, passkey). Authorization answers "what are you allowed to do?" — checking permissions for a resource. You authenticate once per session and authorise on every request.' },
    { q: 'How does HTTPS work?', a: 'Client connects, server presents a certificate signed by a trusted CA. Client verifies the cert, they perform a key exchange (modern TLS uses ECDHE) to derive a shared symmetric key, and the rest of the session is encrypted with that key. The CA system + key exchange together give you authentication AND confidentiality.' },
    { q: 'What are Core Web Vitals and why do they matter?', a: 'LCP (Largest Contentful Paint — load), INP (Interaction to Next Paint — responsiveness), CLS (Cumulative Layout Shift — visual stability). They\'re Google\'s user-experience metrics and feed into search ranking. Practically they\'re a good proxy for "does this site feel fast and stable?".' },
    { q: 'Walk me through deploying a React + Node app to production.', a: 'Containerise both (or use a managed runtime), put the front end behind a CDN (Vercel/Netlify/CloudFront), the API behind a load balancer, the DB on a managed service (RDS/Neon). Set up CI: lint → test → build → deploy on main. Add HTTPS via the platform, structured logs to a sink, error tracking with Sentry, uptime/synthetic monitoring, and a rollback plan.' }
  ]
}
