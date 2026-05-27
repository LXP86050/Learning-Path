// 4-Week Programs — separate, focused sprint plans per track.
// Each topic is { text, detail } so the UI can expand the detail on click.

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
          {
            text: 'Linear algebra essentials — vectors, matrices, dot products.',
            detail:
              'Goal: be able to look at a model architecture diagram and know what every arrow means. Watch the 3Blue1Brown "Essence of Linear Algebra" series (3-4 hrs total). Then practice in NumPy: build a vector, compute a dot product, multiply matrices. By the end of this topic you should be comfortable reading shapes like (N, D) and understand why "matrix-vector multiply" is the same operation as "applying a neural network layer".'
          },
          {
            text: 'Calculus quick tour — derivatives, gradients, chain rule.',
            detail:
              'You do NOT need to be able to integrate by parts. You DO need to understand: derivative = slope, gradient = vector of derivatives, chain rule = how gradients flow through composed functions. That\'s the whole basis of backpropagation. Pick up Khan Academy\'s "Multivariable calculus → Derivatives of multivariable functions" — first 4 videos are enough. Skip everything else.'
          },
          {
            text: 'Probability & statistics — Bayes rule, distributions, expectation.',
            detail:
              'Why: every ML model outputs a probability or an expectation under the hood. Read the first 30 pages of "Think Stats" (free PDF). Learn the four distributions you\'ll actually meet: Bernoulli (coin flip), Categorical (multi-class), Gaussian/Normal (continuous values), Uniform. Understand Bayes rule with one concrete example like "diagnose disease given a positive test". Skip frequentist hypothesis testing for now — you can pick it up later.'
          },
          {
            text: 'Python for ML — NumPy, Pandas, Matplotlib basics.',
            detail:
              'Spend a full evening writing only vectorised NumPy code — no for loops over arrays. Then load a CSV with Pandas, do `.head() .info() .describe() .groupby()`, and plot a histogram + scatter plot with Matplotlib. These three libraries are 90% of the daily code in ML jobs. Tutorial: "Python Data Science Handbook" by Jake VanderPlas (free on GitHub).'
          },
          {
            text: 'Fit a linear regression — by hand, then with scikit-learn.',
            detail:
              'Implement gradient descent in 6 lines of NumPy to fit y = wx + b on a noisy line. Then do the same thing in scikit-learn (2 lines). Compare the weights. The reason to do both: when scikit-learn does something unexpected later, you\'ll have the intuition to debug it. Bonus: print w and b after every 100 steps — watch them converge in your terminal. It\'s deeply satisfying.'
          }
        ],
        project: 'Predict housing prices on the California Housing dataset.'
      },
      {
        week: 2,
        title: 'Classical ML & The Bias–Variance Story',
        subtitle: 'How models actually learn',
        topics: [
          {
            text: 'Supervised vs unsupervised vs reinforcement — when to use what.',
            detail:
              'Supervised: you have labels (most jobs). Unsupervised: you don\'t — clustering, anomaly detection, embeddings. Reinforcement: you have a reward signal — game-playing, robotics, RLHF for LLMs. 90% of real-world ML in industry is supervised. Pick a problem at work and identify which category it is — that\'s the first question to answer before anything else.'
          },
          {
            text: 'Loss functions, gradient descent, learning rate intuition.',
            detail:
              'A loss is a single number that says "how wrong is the model right now?". Lower = better. Gradient descent nudges parameters in the direction that reduces loss. Learning rate is the size of the nudge — too big and you overshoot, too small and training crawls. Play with the Distill.pub "Why Momentum Really Works" interactive demo — half an hour with that and you\'ll have intuitions worth years of paper-reading.'
          },
          {
            text: 'Trees, random forests, gradient boosting (XGBoost / LightGBM).',
            detail:
              'Tree-based models still win most Kaggle competitions on tabular data. A decision tree splits the feature space with if/else rules. A random forest averages many trees (reduces variance). Gradient boosting builds trees sequentially, each one fixing the previous ensemble\'s errors. Install XGBoost, fit it on any tabular dataset, look at `feature_importances_`. This is the single highest-leverage classical ML algorithm — know it cold.'
          },
          {
            text: 'Train/val/test splits, cross-validation, leakage.',
            detail:
              'Split your data BEFORE you do any feature engineering — otherwise you leak information from val/test into train. Train (60-80%) to fit, validation (10-20%) to tune hyperparameters, test (10-20%) touched ONCE at the end. Cross-validation rotates which slice is held out — use when data is small. The classic leakage trap: scaling features using `fit_transform` on the entire dataset, then splitting. Always split first.'
          },
          {
            text: 'Feature engineering: scaling, encoding, interactions.',
            detail:
              'Scaling: subtract mean, divide by std — essential for linear models and neural nets, doesn\'t matter for trees. Encoding categoricals: one-hot for low cardinality, target encoding for high cardinality. Interactions: multiply two features together (e.g. `price * num_rooms`) — gives a linear model power similar to a small tree. Don\'t skip this — feature engineering often beats model choice for tabular problems.'
          }
        ],
        project: 'Kaggle-style classifier on Titanic — beat the public baseline.'
      },
      {
        week: 3,
        title: 'Deep Learning & Transformers',
        subtitle: 'Build a brain, then a language model',
        topics: [
          {
            text: 'Neurons → MLPs → backpropagation — from scratch in NumPy.',
            detail:
              'Write a 2-layer multi-layer perceptron in pure NumPy — forward pass and backward pass by hand. ~40 lines of code. Andrej Karpathy\'s "micrograd" video on YouTube walks through this in 2.5 hours and is the single best intro to deep learning ever made. Do this exercise yourself — once you\'ve coded backprop, every neural net library feels like syntactic sugar.'
          },
          {
            text: 'PyTorch tour — tensors, autograd, nn.Module, DataLoader.',
            detail:
              'PyTorch is the lingua franca of modern AI. You need to know four objects: Tensor (NumPy array + GPU + autograd), nn.Module (a layer or model), optim.Optimizer (updates weights), DataLoader (batches your data). Memorise the 5-line training loop: `forward → loss → zero_grad → backward → step`. This loop is identical whether you\'re training a 100-parameter MLP or a 70-billion-parameter LLM.'
          },
          {
            text: 'CNNs for vision, briefly. Then the Transformer block.',
            detail:
              'CNNs (convolutional neural nets) were king for vision; spend just an hour understanding them. The Transformer is what you actually need to know in 2026. Read "The Illustrated Transformer" by Jay Alammar (visual, gentle). Then implement a self-attention layer from scratch in PyTorch — 15 lines. This is the building block of GPT, Claude, Llama, BERT, ViT — everything.'
          },
          {
            text: 'Attention is all you need — q/k/v, multi-head, residuals.',
            detail:
              'Self-attention: each token computes a Query, a Key, and a Value. It looks at every other token\'s Key, picks the most relevant ones (softmax of Q·K), and produces a weighted sum of those tokens\' Values. Multi-head = several attention computations in parallel, each focused on different patterns. Residuals + layer norm stabilise the gradient flow through deep stacks. Read the original "Attention Is All You Need" paper — it\'s ~10 pages and surprisingly readable.'
          },
          {
            text: 'Fine-tune a pretrained Transformer (DistilBERT).',
            detail:
              'You will (almost) never train a Transformer from scratch — too expensive. You fine-tune. Use HuggingFace `transformers`: load `distilbert-base-uncased`, add a classification head, train 2-3 epochs on a labelled dataset (5,000 examples is plenty). Expect 85-92% accuracy. The whole script is ~30 lines. This is the workflow you\'ll use 90% of the time in industry NLP.'
          }
        ],
        project: 'Fine-tune DistilBERT for sentiment; serve via FastAPI.'
      },
      {
        week: 4,
        title: 'LLM Engineering in Production',
        subtitle: 'Ship something usable',
        topics: [
          {
            text: 'Prompting — zero-shot, few-shot, chain-of-thought.',
            detail:
              'Zero-shot: just ask. Few-shot: give 2-5 examples in the prompt before the real query. Chain-of-thought: ask the model to "think step by step" before giving the final answer. Treat prompts like API contracts — role + task + constraints + output format. Version them. Anthropic and OpenAI both publish official prompting guides — read them. Also learn structured output (JSON schema mode) — it\'s the difference between flaky and production-grade.'
          },
          {
            text: 'Embeddings + vector DBs (FAISS, pgvector, Pinecone).',
            detail:
              'An embedding model maps text (or images, code) to a fixed-length vector where similar things land near each other. Vector DBs index those vectors for fast similarity search. Start with `pgvector` (a Postgres extension) — simplest. For local prototyping, FAISS is fine. Pinecone/Weaviate are managed services. Always use the SAME embedding model for your docs and queries — mixing models silently breaks retrieval.'
          },
          {
            text: 'RAG: chunk → embed → retrieve → ground → answer.',
            detail:
              'RAG (Retrieval-Augmented Generation) is THE pattern for "chat with my data". Chunk documents (~500 tokens with overlap), embed each chunk, store in a vector DB. At query time: embed the query, retrieve top-k chunks, stuff them into the prompt with "answer using ONLY this context". Then call the LLM. The "answer only from context" rule is what stops hallucinations. Build one end-to-end this week — it\'s the most-asked-about skill in AI interviews right now.'
          },
          {
            text: 'Evaluation — golden sets, LLM-as-judge, latency / cost.',
            detail:
              'You cannot ship LLM features without evals. Build a "golden set" — 30 to 100 hand-written (question, expected_answer) pairs that an expert would consider correct. Run them on every prompt change. Score with rubrics or LLM-as-judge (use a stronger model than the one being evaluated). Track latency p50/p95 and cost per query — both creep up silently. Wire this into CI so prompt regressions get caught before deploy.'
          },
          {
            text: 'Observability — tracing, prompt versioning, guardrails.',
            detail:
              'Log every LLM call with: model + version, full prompt + response, latency, tokens used, cost, user/session id. Send to a warehouse (BigQuery, Snowflake) so you can slice later. Use a tracing tool like Langfuse, LangSmith, or Phoenix if you want UI. Guardrails: input filters (block prompt injection patterns), output validators (schema-check JSON), rate limits (per user). Without these, your LLM feature is a liability waiting to happen.'
          }
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
          {
            text: 'How LLMs work — tokens, context, temperature.',
            detail:
              'An LLM doesn\'t see characters or words — it sees tokens (roughly 4 characters each). The context window is the max number of tokens it can read in one go. Temperature controls randomness: 0 = deterministic, 1 = creative. For agents, run at temperature 0 or near it — you want reproducibility. Sampling parameters (top_p, top_k) tweak randomness in different ways. Read OpenAI\'s "tokenizer" page once — it demystifies cost accounting.'
          },
          {
            text: 'Prompt patterns: role + task + context + format.',
            detail:
              'Every reliable prompt has four parts. Role: "You are a senior backend engineer." Task: what to do, specifically. Context: facts the model needs. Format: exactly how to return the answer (JSON schema, bullet list, etc.). Vague prompts produce vague answers — every time. Treat your system prompt like a constitution: version it in git, run evals on changes.'
          },
          {
            text: 'ReAct loops — Thought / Action / Observation.',
            detail:
              'ReAct = Reasoning + Acting. The agent generates a Thought (free-text reasoning), then an Action (tool call), receives an Observation (tool result), and loops until done. Externalising reasoning into the trace makes the agent more accurate AND debuggable. Almost every production agent uses some flavour of this. The original ReAct paper (Yao et al. 2022) is short and worth reading.'
          },
          {
            text: 'Anatomy of an agent: model + tools + memory + loop.',
            detail:
              'An agent has four required pieces. (1) A model that decides what to do next. (2) Tools — functions it can call. (3) Memory — at minimum the conversation buffer. (4) A loop that executes actions and feeds results back. Everything else (LangChain, CrewAI, LangGraph, OpenAI Assistants) is convenience wrappers around these four things. Build one in plain Python first — without a framework — before reaching for one.'
          },
          {
            text: 'Hello-agent — a single-tool agent that web-searches.',
            detail:
              'Build the simplest useful agent: one tool (web search), one loop. ~30 lines of Python. The model decides when to search, you execute the search, feed the results back, and let it answer. Use the Tavily or Serper API for the search. By Friday you should have an agent that can answer "What did OpenAI announce this week?" with citations. Tiny project, huge intuition unlock.'
          }
        ],
        project: 'A web-search agent that cites sources.'
      },
      {
        week: 2,
        title: 'Tool Use, Structured Output & MCP',
        subtitle: 'Give the agent hands',
        topics: [
          {
            text: 'Function-calling APIs (OpenAI, Anthropic) — schemas, parallel tools.',
            detail:
              'Modern APIs let you declare tools as JSON schemas. The model returns a structured tool-call (name + arguments) instead of plain text. Modern models can also return MULTIPLE tool calls in a single turn — execute them in parallel, then return all results. Always check whether your framework actually runs them in parallel — many do them serially by default and you eat 3-4× latency for nothing.'
          },
          {
            text: 'Structured output with Pydantic — fail loudly on bad JSON.',
            detail:
              'Never parse free text in production code. Define a Pydantic model for the expected output, force JSON mode in the API, validate with `model.parse_raw()`. If validation fails: feed the error back into the prompt and retry once. Modern models hit >99% success on retry. Without this discipline, you\'ll spend more time on regex hell than on building features.'
          },
          {
            text: 'Model Context Protocol — agents ↔ tools through a standard.',
            detail:
              'MCP is "LSP for AI tools". Instead of writing custom integrations per framework (LangChain + GitHub, CrewAI + GitHub, Cursor + GitHub, …), you write one MCP server (MCP + GitHub) that any MCP-aware client can use. Anthropic published the spec in 2024 and it\'s rapidly becoming the standard. Build a tiny MCP server with `mcp` Python SDK — exposes a `list_files` tool. Then point Claude Desktop at it.'
          },
          {
            text: 'State: scratchpads, summarisation, when to forget.',
            detail:
              'Conversation memory has three tiers. (1) Short-term: the last N messages, verbatim. (2) Rolling summary: a continuously-updated paragraph of "what we\'ve discussed so far". (3) Long-term: persisted facts ("the user said their account number is X"). Don\'t stuff everything into the context window — token costs balloon and quality degrades after ~20 turns of raw history. Summarisation is your friend.'
          },
          {
            text: 'Error handling — retries, fallbacks, ask vs guess.',
            detail:
              'Tools fail. Networks blink. Models hallucinate tool names. Build agents that gracefully degrade. Retry transient errors with exponential backoff. Have a deterministic fallback for critical paths (e.g. if the LLM can\'t pick a category, default to "uncategorised"). Most importantly: explicitly instruct the agent on when to ASK the user vs GUESS — most agent-runs-wild bugs come from "the model guessed instead of asking".'
          }
        ],
        project: 'A code-review agent that reads a PR via MCP.'
      },
      {
        week: 3,
        title: 'Planning & Long-Horizon Tasks',
        subtitle: 'Beyond a single loop',
        topics: [
          {
            text: 'LangGraph & state machines — agents as nodes and edges.',
            detail:
              'For multi-step tasks, model your agent as a directed graph: nodes = steps, edges = transitions. LangGraph (or your own state machine) makes the control flow explicit and inspectable. Compare with the "one big system prompt" approach: explicit graphs are debuggable, prompt-only agents are not. Spend a session reading LangGraph\'s docs and porting your week-1 search agent to a graph.'
          },
          {
            text: 'Planner + executor — when to plan, when to improvise.',
            detail:
              'Plan-then-execute: one LLM call produces a step list, a second LLM (or loop) executes each step. Best for tasks with a roughly predictable shape. Improvise / ReAct: best for open-ended tasks where the path depends on what you find. The hybrid — plan, execute, re-plan if needed — is the most robust pattern. Add a re-plan check after every step: "Given new information, is the rest of the plan still valid?"'
          },
          {
            text: 'Subagents and delegation.',
            detail:
              'Spawn a focused subagent when (a) the task has a sub-task that needs a different system prompt, (b) you need parallel exploration of independent paths, or (c) you want a clean context window for a sensitive task. DON\'T spawn a subagent for every step — coordination overhead kills you. Anthropic\'s research-agent pattern (one supervisor + N parallel research subagents → synthesiser) is the canonical good case.'
          },
          {
            text: 'Long-term memory — vector recall, episodic memory.',
            detail:
              'Long-term memory has two flavours. (1) Semantic: store facts/summaries in a vector DB, retrieve by similarity when relevant ("user previously said they prefer Python"). (2) Episodic: structured records of events ("on 2026-05-12, user opened ticket #4321"). Tools: Mem0, LangMem, or just pgvector + a `memories` table. Avoid loading everything into context every turn — retrieve on demand.'
          },
          {
            text: 'Human-in-the-loop checkpoints.',
            detail:
              'For high-stakes actions (sending email, charging cards, deploying code), pause the agent and ask a human. Implement this as a tool the agent can call: `request_approval(action, reason)` that blocks until a human responds. Cheap insurance against catastrophic mistakes. Bonus: log every approval — you\'ll learn which actions are safe to auto-approve later.'
          }
        ],
        project: 'A research agent that writes a literature-review markdown.'
      },
      {
        week: 4,
        title: 'Evals, Safety & Multi-Agent',
        subtitle: 'Ship agents you can trust',
        topics: [
          {
            text: 'Evals — trajectory + outcome grading.',
            detail:
              'You cannot ship an agent without evals. Score at TWO levels. Trajectory: did it take the right steps, in the right order, with correct tool args? Outcome: was the final result correct, within budget, on time? A 30-task eval set hand-graded once, then auto-replayed on every prompt change, catches 90% of regressions. Treat your eval suite like a test suite — wire it into CI.'
          },
          {
            text: 'Tracing with LangSmith / Langfuse / OTel.',
            detail:
              'Non-determinism is the biggest source of agent bugs. Same input → different traces → impossible to reproduce. Counter it with full tracing: every LLM call, every tool call, every input + output, model version, seed, latency, cost. LangSmith and Langfuse give you UI for free. OpenTelemetry is the open standard if you\'re self-hosting. Without tracing you cannot debug, period.'
          },
          {
            text: 'Guardrails — input filters, output validators, sandboxing.',
            detail:
              'Three layers. Input guardrails: detect prompt-injection patterns, PII, off-topic queries before they reach the model. Output validators: schema-check JSON, scan for hallucinated facts, block harmful content. Sandboxing: never give the agent shell access on your prod machine — run code in a Docker container or remote sandbox (e.g. E2B). Open source library: Guardrails AI, NeMo Guardrails.'
          },
          {
            text: 'Multi-agent orchestration — supervisor patterns, parallel sub-agents.',
            detail:
              'Default: ONE agent + good tools + clear prompt. Reach for multi-agent only when (a) subtasks are genuinely independent (parallel research) or (b) roles require isolated contexts (e.g. one agent that writes, one that reviews adversarially). Supervisor pattern: orchestrator → specialists, specialists never call each other. Avoid free-form peer-to-peer agents — three hops in, the trace becomes unreadable.'
          },
          {
            text: 'Deployment — async queues, cost controls, autoscaling.',
            detail:
              'Agents are slow (multiple LLM round-trips), so serve them via a queue, not synchronous HTTP. SQS + Lambda or Celery + Redis. Add hard cost limits per task (token + tool-call budget, wall-clock timeout) — runaway loops are the #1 bill-blower. Autoscale workers based on queue depth. Set up alerts for cost spikes; you\'ll be glad you did the day a prompt regression triggers an infinite loop.'
          }
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
          {
            text: 'How the web works — DNS, HTTP, render pipeline.',
            detail:
              'Type a URL → DNS resolves to IP → TCP+TLS handshake → HTTP request → server responds with HTML → browser parses, builds DOM + CSSOM, runs layout, paints, composites. Knowing this lifecycle makes you 10× better at debugging. Open Chrome DevTools → Network tab on any site and watch this happen. Then read Ilya Grigorik\'s "High Performance Browser Networking" — first 3 chapters are free online.'
          },
          {
            text: 'Semantic HTML and accessibility.',
            detail:
              'Use `<button>` for buttons, `<a>` for links, `<nav>` for navigation, `<main>` for main content. Free accessibility, free SEO. Test with VoiceOver (Mac) or NVDA (Windows) — close your eyes, navigate your own site. The WAI-ARIA Authoring Practices guide is the bible. Most "accessibility issues" are just "you used the wrong tag". This is the single biggest thing junior devs get wrong and senior devs care about.'
          },
          {
            text: 'Modern CSS — box model, flex, grid, custom properties.',
            detail:
              'The box model: content + padding + border + margin (set `box-sizing: border-box` once, globally). Flexbox: 1D layouts (rows or columns). Grid: 2D layouts (rows AND columns). Custom properties (CSS variables): theming, responsive design. Skip Bootstrap and Tailwind until you can write raw CSS that does what you need — you\'ll understand the abstractions when you reach for them.'
          },
          {
            text: 'JavaScript fundamentals — values, scope, closures.',
            detail:
              'Types: string, number, boolean, object, array, null, undefined. Scope: where a variable is visible (function vs block). Closures: a function "remembers" its outer scope even after that scope has finished. These three concepts cause 80% of "wat?" JS bugs. Read "You Don\'t Know JS" by Kyle Simpson (free on GitHub) — at least the "Scope & Closures" book. Trust me, this pays for years.'
          },
          {
            text: 'The DOM and events — UI without a framework.',
            detail:
              'Before React: how does a browser actually do interactive UI? `document.querySelector()`, `element.addEventListener()`, `element.classList.toggle()`. Event delegation: attach one listener at the parent, check `event.target`. Build a TODO list with vanilla JS and no framework — once. Then when you pick up React, you\'ll know what it\'s abstracting away.'
          }
        ],
        project: 'A responsive landing page with a contact form on GitHub Pages.'
      },
      {
        week: 2,
        title: 'Modern JS & React',
        subtitle: 'From DOM-poking to components',
        topics: [
          {
            text: 'ES2020+ — destructuring, spread, modules, async/await.',
            detail:
              'Eight features cover 95% of modern JS. Destructuring: `const { name } = user`. Spread: `[...arr, newItem]`. Modules: `import` / `export`. Async/await over `.then` chains. Optional chaining: `user?.address?.city`. Nullish coalescing: `value ?? default`. Template literals: `` `Hi ${name}` ``. Array methods: `map`, `filter`, `reduce`. Memorise these and you can read any modern JS codebase.'
          },
          {
            text: 'Build tools — Vite, npm, dev vs prod builds.',
            detail:
              'npm: package manager (`npm install`, `package.json`, `node_modules`). Vite: modern dev server + bundler (replaces webpack for most projects). Dev mode: instant HMR, source maps, no minification. Prod mode: minified, code-split, tree-shaken. Know `vite.config.js` basics and how to add a build script to `package.json`. Skip webpack unless you inherit it — Vite is the present and future.'
          },
          {
            text: 'React mental model — components, props, state, render.',
            detail:
              'UI = f(state). React renders a tree of components from state. On state change, it diffs the new tree against the old and applies the minimum DOM updates. Components are just functions that return JSX. Props are inputs from the parent. State is owned by the component. The mental model is what matters — once it clicks, the rest of React is small.'
          },
          {
            text: 'Hooks — useState, useEffect, useMemo, useRef, custom hooks.',
            detail:
              'useState: local state. useEffect: side effects (fetch, subscribe, log) — always return a cleanup function. useMemo: cache an expensive computation across renders. useRef: a mutable value that survives re-renders without triggering one (great for DOM refs). Custom hooks: any function that starts with `use` and calls other hooks. That\'s the whole rule. Build `useLocalStorage` — it\'s the "hello world" of custom hooks.'
          },
          {
            text: 'Forms, lists, routing, CSS-in-component patterns.',
            detail:
              'Forms: controlled (state holds value) vs uncontrolled (DOM holds value). For lists, always pass a stable `key` prop. Routing: React Router for SPAs, Next.js if you want SSR. CSS: pick ONE approach — CSS Modules, Tailwind, styled-components, or vanilla CSS files. Don\'t mix three. Don\'t reinvent — every solved problem has a battle-tested library.'
          }
        ],
        project: 'A weather dashboard with search, favourites, and dark mode.'
      },
      {
        week: 3,
        title: 'Backend, APIs & Databases',
        subtitle: 'Make the server side click',
        topics: [
          {
            text: 'Node.js + Express — routes, middleware, errors.',
            detail:
              'Node.js: JavaScript on the server. Express: minimalist HTTP framework. Routes: `app.get("/users", handler)`. Middleware: functions that run before handlers (auth, logging, body parsing) — composable with `next()`. Error handling: an error-handling middleware (`(err, req, res, next) => ...`) catches anything thrown by routes. Build a small REST API by Friday — auth + 2 resources. That\'s enough to grok the pattern.'
          },
          {
            text: 'REST design — resources, status codes, idempotency.',
            detail:
              'Resources are nouns (`/users`, `/orders`), not verbs. Methods are verbs: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove). Status codes matter — 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Validation Failed, 500 Server Error. Make PUT/DELETE idempotent — same request, same result. Read "RESTful Web APIs" by Mark Massé for the deep dive.'
          },
          {
            text: 'SQL with Postgres — schema, joins, indexes, transactions.',
            detail:
              'Postgres is still the king of relational databases in 2026. Tables, primary keys, foreign keys. Joins: INNER, LEFT, RIGHT, FULL — know when to use each. Indexes make queries fast — always check `EXPLAIN ANALYZE` on slow queries. Transactions: BEGIN/COMMIT for multi-statement atomicity. Most "we need NoSQL" decisions in junior teams turn out to be "we didn\'t learn SQL properly". Spend a full evening doing pgexercises.com.'
          },
          {
            text: 'ORMs (Prisma / Drizzle) vs raw SQL.',
            detail:
              'ORM: write `User.find({ where: { email } })`, get an object back. Pros: ergonomics, type-safety, migrations. Cons: hides what SQL actually runs (N+1 queries silently). Prisma is the most popular Node ORM in 2026; Drizzle is the type-safety darling. Even with an ORM, learn to read the SQL it generates — `prisma --log query` or equivalent. Raw SQL is fine for read-heavy analytical queries.'
          },
          {
            text: 'Authentication — sessions vs JWT, hashing, OAuth.',
            detail:
              'Sessions: server stores session, client holds a session ID (cookie). Stateful, easy to revoke. JWT: server signs a token, client holds it. Stateless, hard to revoke before expiry. Use sessions for traditional web apps, JWT for mobile/SPAs. ALWAYS hash passwords with bcrypt/argon2 — never MD5/SHA-256. OAuth: delegate auth to Google/GitHub/etc. Use a library (Auth.js, Lucia, Clerk) — don\'t roll your own.'
          }
        ],
        project: 'A task tracker — React + Express + Postgres + JWT, on Render.'
      },
      {
        week: 4,
        title: 'Production: Deploy, Monitor, Iterate',
        subtitle: 'Operate what you build',
        topics: [
          {
            text: 'Docker basics — images, containers, multi-stage builds.',
            detail:
              'Image = a frozen filesystem + config. Container = a running instance of an image. `Dockerfile` defines the image. Multi-stage builds: use a "builder" image to compile, then copy the artefact into a tiny "runtime" image — drops your final image size by 5-10×. Write a Dockerfile for your week-3 project. `docker compose up` to run app + Postgres locally with one command. This is the unit of "deploy" in 2026.'
          },
          {
            text: 'CI/CD with GitHub Actions — lint, test, build, deploy.',
            detail:
              'CI: every push runs lint + tests + build. CD: every push to `main` deploys to production. GitHub Actions: drop a `.github/workflows/ci.yml` file, GitHub runs it free for public repos. Pipeline: checkout → setup node → install → lint → test → build → deploy. Cache `node_modules` between runs (saves minutes). Once it\'s green on main, you should never deploy manually again.'
          },
          {
            text: 'Cloud primitives — Vercel/Netlify front, Render/Fly back.',
            detail:
              'You don\'t need AWS for side projects. Vercel/Netlify/Cloudflare Pages: serve your static front-end on a CDN, free tier generous. Render/Fly.io/Railway: deploy containers, managed Postgres/Redis, ~$7/mo for small apps. Use AWS/GCP only when you have a real reason. Spend a session reading Vercel\'s deployment docs — even if you go elsewhere, the model is clarifying.'
          },
          {
            text: 'Observability — structured logs, Sentry, basic metrics.',
            detail:
              'Logs: structured (JSON, not plaintext) so you can search and slice. Use pino/winston. Sentry: catches every unhandled exception with stack trace, request, user — `Sentry.init()` is one line and worth its weight in gold. Metrics: count requests, errors, latency p95. Grafana Cloud or Datadog free tier. You don\'t need a full observability stack on day one — these three things cover 90% of the value.'
          },
          {
            text: 'Performance — Core Web Vitals, lazy loading, CDN.',
            detail:
              'Core Web Vitals: LCP (Largest Contentful Paint — perceived load), INP (Interaction to Next Paint — responsiveness), CLS (Cumulative Layout Shift — stability). Google ranks search on these. Tools: PageSpeed Insights, Lighthouse (in Chrome DevTools). Wins: lazy-load images (`loading="lazy"`), code-split heavy routes, serve assets from a CDN, set `width`/`height` on images to prevent CLS. Each win is small; together they\'re the difference between "feels fast" and "feels broken".'
          }
        ],
        project: 'Ship the task tracker for real — domain, HTTPS, CI, Sentry, runbook.'
      }
    ]
  }
}
