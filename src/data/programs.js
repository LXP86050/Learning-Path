// 4-Week Programs — a separate, focused sprint plan per track.
// This is independent of the deep learning paths; users may want only the structured plan.

export const programs = {
  ai: {
    id: 'ai',
    title: 'AI Engineer · 4-Week Sprint',
    accent: ['#7c5cff', '#22d3ee'],
    summary:
      'A tight, project-driven 4-week plan that takes you from "I write Python" to "I deployed a RAG chatbot". ~10 hrs/week.',
    weeks: [
      {
        week: 1,
        title: 'Foundations: Math, Python & ML Intuition',
        subtitle: 'Set up the runway',
        topics: [
          'Linear algebra essentials — vectors, matrices, dot products.',
          'Calculus quick tour — derivatives, gradients, chain rule.',
          'Probability & statistics — Bayes rule, distributions, expectation.',
          'Python for ML — NumPy, Pandas, Matplotlib basics.',
          'Fit a linear regression — by hand, then with scikit-learn.'
        ],
        project: 'Predict housing prices on the California Housing dataset.'
      },
      {
        week: 2,
        title: 'Classical ML & The Bias–Variance Story',
        subtitle: 'How models actually learn',
        topics: [
          'Supervised vs unsupervised vs reinforcement — when to use what.',
          'Loss functions, gradient descent, learning rate intuition.',
          'Trees, random forests, gradient boosting (XGBoost / LightGBM).',
          'Train/val/test splits, cross-validation, leakage.',
          'Feature engineering: scaling, encoding, interactions.'
        ],
        project: 'Kaggle-style classifier on Titanic — beat the public baseline.'
      },
      {
        week: 3,
        title: 'Deep Learning & Transformers',
        subtitle: 'Build a brain, then a language model',
        topics: [
          'Neurons → MLPs → backpropagation — from scratch in NumPy.',
          'PyTorch tour — tensors, autograd, nn.Module, DataLoader.',
          'CNNs for vision, briefly. Then the Transformer block.',
          'Attention is all you need — q/k/v, multi-head, residuals.',
          'Fine-tune a pretrained Transformer (DistilBERT).'
        ],
        project: 'Fine-tune DistilBERT for sentiment; serve via FastAPI.'
      },
      {
        week: 4,
        title: 'LLM Engineering in Production',
        subtitle: 'Ship something usable',
        topics: [
          'Prompting — zero-shot, few-shot, chain-of-thought.',
          'Embeddings + vector DBs (FAISS, pgvector, Pinecone).',
          'RAG: chunk → embed → retrieve → ground → answer.',
          'Evaluation — golden sets, LLM-as-judge, latency / cost.',
          'Observability — tracing, prompt versioning, guardrails.'
        ],
        project: 'RAG chatbot over your PDFs — Streamlit + FastAPI + pgvector.'
      }
    ]
  },
  agentic: {
    id: 'agentic',
    title: 'Agentic Engineer · 4-Week Sprint',
    accent: ['#22d3ee', '#4ade80'],
    summary:
      'Go from "calls a chat API" to "shipped a multi-agent system with evals". The most in-demand AI skill of 2026.',
    weeks: [
      {
        week: 1,
        title: 'Prompting & The Anatomy of an Agent',
        subtitle: 'Talk to models like an engineer',
        topics: [
          'How LLMs work — tokens, context, temperature.',
          'Prompt patterns: role + task + context + format.',
          'ReAct loops — Thought / Action / Observation.',
          'Anatomy of an agent: model + tools + memory + loop.',
          'Hello-agent — a single-tool agent that web-searches.'
        ],
        project: 'A web-search agent that cites sources.'
      },
      {
        week: 2,
        title: 'Tool Use, Structured Output & MCP',
        subtitle: 'Give the agent hands',
        topics: [
          'Function-calling APIs (OpenAI, Anthropic) — schemas, parallel tools.',
          'Structured output with Pydantic — fail loudly on bad JSON.',
          'Model Context Protocol — agents ↔ tools through a standard.',
          'State: scratchpads, summarisation, when to forget.',
          'Error handling — retries, fallbacks, ask vs guess.'
        ],
        project: 'A code-review agent that reads a PR via MCP.'
      },
      {
        week: 3,
        title: 'Planning & Long-Horizon Tasks',
        subtitle: 'Beyond a single loop',
        topics: [
          'LangGraph & state machines — agents as nodes and edges.',
          'Planner + executor — when to plan, when to improvise.',
          'Subagents and delegation.',
          'Long-term memory — vector recall, episodic memory.',
          'Human-in-the-loop checkpoints.'
        ],
        project: 'A research agent that writes a literature-review markdown.'
      },
      {
        week: 4,
        title: 'Evals, Safety & Multi-Agent',
        subtitle: 'Ship agents you can trust',
        topics: [
          'Evals — trajectory + outcome grading.',
          'Tracing with LangSmith / Langfuse / OTel.',
          'Guardrails — input filters, output validators, sandboxing.',
          'Multi-agent orchestration — supervisor patterns, parallel sub-agents.',
          'Deployment — async queues, cost controls, autoscaling.'
        ],
        project: 'A multi-agent support bot: router → specialists → QA.'
      }
    ]
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack Developer · 4-Week Sprint',
    accent: ['#f472b6', '#7c5cff'],
    summary:
      'From "what is HTML" to "deployed full-stack app with auth + DB + CI". Every week ends with something live.',
    weeks: [
      {
        week: 1,
        title: 'The Web Platform from Zero',
        subtitle: 'HTML, CSS, JS in your head',
        topics: [
          'How the web works — DNS, HTTP, render pipeline.',
          'Semantic HTML and accessibility.',
          'Modern CSS — box model, flex, grid, custom properties.',
          'JavaScript fundamentals — values, scope, closures.',
          'The DOM and events — UI without a framework.'
        ],
        project: 'A responsive landing page with a contact form on GitHub Pages.'
      },
      {
        week: 2,
        title: 'Modern JS & React',
        subtitle: 'From DOM-poking to components',
        topics: [
          'ES2020+ — destructuring, spread, modules, async/await.',
          'Build tools — Vite, npm, dev vs prod builds.',
          'React mental model — components, props, state, render.',
          'Hooks — useState, useEffect, useMemo, useRef, custom hooks.',
          'Forms, lists, routing, CSS-in-component patterns.'
        ],
        project: 'A weather dashboard with search, favourites, and dark mode.'
      },
      {
        week: 3,
        title: 'Backend, APIs & Databases',
        subtitle: 'Make the server side click',
        topics: [
          'Node.js + Express — routes, middleware, errors.',
          'REST design — resources, status codes, idempotency.',
          'SQL with Postgres — schema, joins, indexes, transactions.',
          'ORMs (Prisma / Drizzle) vs raw SQL.',
          'Authentication — sessions vs JWT, hashing, OAuth.'
        ],
        project: 'A task tracker — React + Express + Postgres + JWT, on Render.'
      },
      {
        week: 4,
        title: 'Production: Deploy, Monitor, Iterate',
        subtitle: 'Operate what you build',
        topics: [
          'Docker basics — images, containers, multi-stage builds.',
          'CI/CD with GitHub Actions — lint, test, build, deploy.',
          'Cloud primitives — Vercel/Netlify front, Render/Fly back.',
          'Observability — structured logs, Sentry, basic metrics.',
          'Performance — Core Web Vitals, lazy loading, CDN.'
        ],
        project: 'Ship the task tracker for real — domain, HTTPS, CI, Sentry, runbook.'
      }
    ]
  }
}
