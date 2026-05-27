// Practice tasks per section. Each task: { title, prompt, solution }.
// Solutions render as markdown inside a click-to-expand button.

export const tasks = {
  // ============== AI ENGINEER ==============
  ai: {
    vectors: [
      {
        title: 'Vector similarity by hand',
        prompt:
          'Given `a = [1, 2, 3]` and `b = [2, 0, 1]`, compute the dot product `a · b` by hand. Then implement it in NumPy and verify your answer.',
        solution: `By hand: \`(1×2) + (2×0) + (3×1) = 2 + 0 + 3 = 5\`.

\`\`\`python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([2, 0, 1])
print(np.dot(a, b))   # 5
\`\`\`

Why care: this single scalar is the building block of similarity in search, attention in Transformers, and every linear layer in a neural net.`
      },
      {
        title: 'Cosine similarity vs dot product',
        prompt:
          'Two documents have embeddings `d1 = [10, 0]` and `d2 = [1, 0]`. They point in the **same direction**, but their dot products with a query `q = [1, 0]` are 10 and 1. Compute the *cosine* similarities and explain which metric is fairer when documents have different lengths.',
        solution: `Cosine similarity is the dot product divided by the product of the magnitudes — it ignores magnitude:

\`\`\`python
import numpy as np
def cosine(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

cosine([10, 0], [1, 0])  # 1.0
cosine([1, 0], [1, 0])   # 1.0
\`\`\`

Both are perfectly aligned with the query. **Use cosine similarity when document length varies** (real-world RAG, recommendation). Use raw dot product when magnitudes carry real meaning (popularity-weighted retrieval).`
      }
    ],

    'python-numpy': [
      {
        title: 'Vectorise this loop',
        prompt:
          'Rewrite the following Python without any `for` loop, using NumPy only:\n\n```python\nresult = []\nfor x in data:\n    result.append((x - mean) ** 2)\n```',
        solution: `\`\`\`python
import numpy as np
result = (data - mean) ** 2
\`\`\`

That\'s it. \`data - mean\` broadcasts the scalar across the array, then \`** 2\` squares element-wise. The result is the per-element squared deviation — the inside of a variance calculation. On a million-element array, this is roughly 80× faster than the loop.`
      },
      {
        title: 'Mean-centre a matrix',
        prompt:
          'You have a matrix `X` of shape `(N, D)` (N rows, D features). Subtract the mean of each *column* from every row — one line of NumPy.',
        solution: `\`\`\`python
X_centred = X - X.mean(axis=0)
\`\`\`

\`X.mean(axis=0)\` collapses the rows and returns a length-D vector of column means. Subtracting it broadcasts across all N rows. Mean-centering is the first half of standardisation (the other half is dividing by \`X.std(axis=0)\`) and is the data-prep step before fitting nearly any linear or distance-based model.`
      }
    ],

    'first-model': [
      {
        title: 'Predict, then check R²',
        prompt:
          'Fit a `LinearRegression` on `X_train`, `y_train` (any toy dataset), predict on `X_test`, and report the R² score. R² close to 1 = great fit, 0 = no better than the mean.',
        solution: `\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

model = LinearRegression().fit(X_train, y_train)
y_pred = model.predict(X_test)
print("R²:", r2_score(y_test, y_pred))
\`\`\`

If you get a *negative* R², your model is worse than predicting the mean — usually a sign your features don\'t carry signal, or you have a target leakage / scaling bug. Either is worth investigating before adding any complexity.`
      },
      {
        title: 'Spot the leakage',
        prompt:
          'A teammate gets 99.8% accuracy predicting customer churn. They used these features: `[plan_type, last_login_days, account_age, **cancellation_processed**]`. What\'s the bug?',
        solution: `\`cancellation_processed\` is a **target leak** — it can only be true *after* a churn event. You\'re predicting the past from the future.

The fix: any feature derived from after the prediction point must be removed. Audit your feature pipeline by asking, for each column: *"Would this be available at the moment I need to make the prediction?"* If no, drop it.

A 99.8% number that sounds too good is almost always a leak. Real classifier accuracy on churn-style problems is usually 70–85%.`
      }
    ],

    supervised: [
      {
        title: 'Pick the right metric',
        prompt:
          'You\'re building a model to flag fraudulent credit-card transactions. 0.2% of transactions are actually fraud. Which metric should you optimise — accuracy, precision, recall, F1, or AUC? Defend your choice.',
        solution: `**Recall first, with a precision floor.**

- Accuracy is useless: predicting "never fraud" already scores 99.8%.
- Recall (sensitivity) measures *what fraction of real fraud you caught* — you want this high, otherwise fraud slips through.
- But pure recall lets you flag everything, which annoys real customers. So pair it with a **minimum precision** constraint (e.g. "at least 30% of flagged transactions must be real fraud").
- In practice teams optimise the **PR-AUC** (precision-recall area-under-curve) or pick an operating point on the curve that matches their cost ratio between false positives and false negatives.`
      },
      {
        title: 'Train/val/test in one snippet',
        prompt:
          'Split a dataset `(X, y)` into 60% train / 20% validation / 20% test, all with `random_state=42`. Use only `train_test_split`.',
        solution: `\`\`\`python
from sklearn.model_selection import train_test_split

# First split off the 20% test set
X_trval, X_te, y_trval, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Then 20% of the original = 25% of the remaining 80%
X_tr, X_val, y_tr, y_val = train_test_split(X_trval, y_trval, test_size=0.25, random_state=42)

print(len(X_tr), len(X_val), len(X_te))   # ~60/20/20 of total
\`\`\`

You tune on validation, you report on test, and you only touch test **once** — at the very end.`
      }
    ],

    'trees-boosting': [
      {
        title: 'Why boosting beats one tree',
        prompt:
          'In one or two sentences, explain why a gradient-boosted ensemble of 200 shallow trees usually beats a single deep tree on tabular data.',
        solution: `A single deep tree has low bias but high variance — it memorises the training data and generalises poorly. Boosting builds many *shallow* trees sequentially, with each one focused on correcting the residual errors of the previous ensemble. The average has low variance (because errors cancel) AND low bias (because together they cover patterns no single shallow tree could). It\'s the bias–variance tradeoff resolved by averaging.`
      },
      {
        title: 'Plot feature importance',
        prompt:
          'Given a fitted `GradientBoostingClassifier`, print the top-5 most important features, sorted from highest to lowest.',
        solution: `\`\`\`python
import pandas as pd

imp = pd.Series(model.feature_importances_, index=X.columns)
print(imp.sort_values(ascending=False).head())
\`\`\`

In an interview, follow up with: "Feature importance from trees can be misleading when features are correlated — one of a pair may steal all the credit. For robust attribution, use **SHAP values** instead."`
      }
    ],

    neuron: [
      {
        title: 'Implement a ReLU neuron',
        prompt:
          'Write a function `neuron(x, w, b)` that returns `max(0, w · x + b)` using NumPy. Test it with `x = [1, 2]`, `w = [0.5, -0.3]`, `b = 0.1`.',
        solution: `\`\`\`python
import numpy as np

def neuron(x, w, b):
    z = float(np.dot(w, x) + b)
    return max(0.0, z)             # ReLU activation

print(neuron([1, 2], [0.5, -0.3], 0.1))   # 0.0  (z = 0.5 - 0.6 + 0.1 = 0.0)
print(neuron([1, 2], [0.5,  0.3], 0.1))   # 1.2
\`\`\`

That\'s the entire computational unit of a deep neural network. Stack millions of these in a regular pattern, train with backprop, and you have GPT.`
      },
      {
        title: 'Why non-linear activations?',
        prompt:
          'If you stack 10 linear layers (no activation between them), what is the resulting function? Why do we insert ReLU between layers?',
        solution: `10 stacked linear layers collapse into a **single linear layer**: any composition of linear maps is itself linear. So depth without non-linearity buys you nothing — you might as well use one layer.

ReLU (or GELU, sigmoid, tanh) breaks the linearity. Now each layer can warp the input space differently, and the composition can represent any continuous function — that\'s the *universal approximation theorem*. The non-linearity is what makes "deep" actually useful.`
      }
    ],

    pytorch: [
      {
        title: 'Write the canonical training loop',
        prompt:
          'Given a `model`, `loss_fn`, `optimizer`, and a `dataloader`, write the inner training-step block. Five lines.',
        solution: `\`\`\`python
for xb, yb in dataloader:
    pred = model(xb)
    loss = loss_fn(pred, yb)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
\`\`\`

Memorise this. Every PyTorch project — from a 100-parameter MLP to a 70B-parameter LLM fine-tune — starts here. The only thing that ever changes is what \`model\` and \`loss_fn\` are.`
      },
      {
        title: 'Move to GPU',
        prompt:
          'How do you make the above loop use a GPU if one is available, with one extra setup line and minimal changes inside the loop?',
        solution: `\`\`\`python
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

for xb, yb in dataloader:
    xb, yb = xb.to(device), yb.to(device)
    # ... rest unchanged
\`\`\`

On Apple Silicon, replace \`"cuda"\` with \`"mps"\`. Forgetting to move the *batch* (only moving the model) is the most common cause of "Expected all tensors to be on the same device" errors.`
      }
    ],

    transformers: [
      {
        title: 'Why divide by √d in attention?',
        prompt:
          'The attention formula is `softmax(QKᵀ / √d) · V`. What goes wrong if you drop the `/√d`?',
        solution: `Without the scaling, dot products grow proportionally to \`d\` (the embedding dimension). For large \`d\` (say 512+), the largest score gets exponentially bigger than the rest, and \`softmax\` saturates — one token gets ~1.0 attention and everything else ~0.

In that regime, gradients flowing back through \`softmax\` become tiny (the function is nearly flat at the extremes), and training stalls. Dividing by \`√d\` keeps the distribution of scores stable as you scale up.`
      },
      {
        title: 'Fine-tune vs from scratch',
        prompt:
          'You have 5,000 labelled customer reviews and want a sentiment classifier. Should you train a Transformer from scratch, or fine-tune a pretrained one? Why?',
        solution: `**Fine-tune.** A Transformer trained from scratch needs millions of examples to learn the structure of English — you have 5,000. A pretrained model (e.g. \`distilbert-base-uncased\`) already encodes grammar, syntax, and semantics from billions of words. You only need to teach it *your* labels.

In code: load a pretrained checkpoint, add a small classification head, freeze most layers (or use a low learning rate like 2e-5), and train 2–3 epochs on your 5,000 examples. Expect 85–92% accuracy. Training from scratch would give you something between random and useless on this dataset.`
      }
    ],

    prompting: [
      {
        title: 'Rewrite this bad prompt',
        prompt:
          'A teammate is calling an LLM with: `"Summarise the following article."` Their downstream code parses the result as JSON and crashes half the time. Rewrite the prompt so it returns structured, predictable output.',
        solution: `\`\`\`text
You are a financial analyst. Read the article below and return a JSON object
with exactly these keys: "headline" (string, ≤ 12 words), "key_points"
(array of exactly 3 strings, each ≤ 20 words), "sentiment" (one of: "positive",
"neutral", "negative").

Return ONLY the JSON object, no surrounding prose. If the article is empty,
return {"error": "empty"}.

Article:
"""<text here>"""
\`\`\`

Three things changed: explicit role, exact schema, and an error path. Pair this with the model API\'s native JSON / structured-output mode for ~100% reliability.`
      },
      {
        title: 'Few-shot beats describing the format',
        prompt:
          'You need an LLM to extract `{person, company}` pairs from sentences. Should you describe the format in words, or give examples? Write a 2-shot version.',
        solution: `Examples win — almost always.

\`\`\`text
Extract person and company. Return JSON.

Sentence: "Satya Nadella runs Microsoft."
Output: {"person": "Satya Nadella", "company": "Microsoft"}

Sentence: "Lokesh joined Infosys in 2019."
Output: {"person": "Lokesh", "company": "Infosys"}

Sentence: "<your new sentence>"
Output:
\`\`\`

Two examples teach the model the exact pattern more reliably than a paragraph of "the output should be JSON with two keys named...". Use few-shot whenever the format matters.`
      }
    ],

    embeddings: [
      {
        title: 'Rank these by similarity',
        prompt:
          'Query: `"How do I reset my password?"`. Three candidate FAQ entries: `(a) "I forgot my login credentials"`, `(b) "Where is the office?"`, `(c) "How do I change my address?"`. Which ranks first and why?',
        solution: `**(a) ranks first.** "Forgot login credentials" is semantically the closest concept to "reset password" — both are about authentication recovery. The embedding model maps both to nearby points in vector space even though they share zero overlapping words.

(c) is a distant second — it shares the word "change" with the implicit "change my password", but the subject is different. (b) is unrelated.

This is the magic of embeddings vs keyword search: a BM25 or TF-IDF search would put (c) first because of literal word overlap. Embeddings get the *meaning*.`
      },
      {
        title: 'Chunking strategy',
        prompt:
          'You\'re embedding a 200-page legal contract for RAG. Should each chunk be: (a) one sentence, (b) ~500 tokens with no overlap, (c) ~500 tokens with 50-token overlap, or (d) the whole document? Defend your pick.',
        solution: `**(c) ~500 tokens with 50-token overlap.**

- (a) is too granular — a single sentence rarely carries enough context to answer a question on its own.
- (b) loses context at chunk boundaries. A clause whose subject is in chunk 3 and verb in chunk 4 becomes ungroundable.
- (c) preserves boundary context with the overlap; 500 tokens is a sensible "paragraph-ish" size for legal text.
- (d) defeats the purpose of RAG — you\'re back to stuffing everything into the prompt.

Bonus: store each chunk\'s source page and section heading as metadata so you can cite back to the contract in the UI.`
      }
    ],

    rag: [
      {
        title: 'Why "answer only from context"?',
        prompt:
          'Your RAG system\'s prompt currently says: `"Use the context to help answer the question."`. It still hallucinates facts not in the context. Rewrite the instruction to eliminate this.',
        solution: `\`\`\`text
Answer the question using ONLY information present in the context below.
If the answer is not in the context, reply exactly: "I don\'t know based on
the provided sources." Do not use prior knowledge.

Context:
<chunks>

Question:
<user question>
\`\`\`

Two changes that matter: (1) "ONLY" is non-negotiable, and (2) there\'s a defined escape hatch. Without the escape hatch, the model will try to please you and invent something. With it, "I don\'t know" becomes a valid, expected answer.`
      },
      {
        title: 'Build a 30-case eval set',
        prompt:
          'What columns should a "golden set" spreadsheet for RAG have, and why? List at least four.',
        solution: `Minimum useful golden-set schema:

1. **question** — what a real user might ask.
2. **expected_answer** — a domain expert\'s written-out correct answer.
3. **expected_sources** — which doc / chunk IDs *should* be retrieved.
4. **difficulty / category** — so you can slice by topic and measure regressions.
5. **acceptable_alternatives** *(optional)* — list of answer variants that should also count as correct.

This unlocks two evals: **retrieval recall** ("did we fetch any expected_source?") and **answer correctness** ("does the model\'s answer match expected_answer?"). Run both in CI on every prompt change.`
      }
    ],

    serving: [
      {
        title: 'Wrap a model in FastAPI',
        prompt:
          'Given a scikit-learn model saved as `churn.pkl`, write a minimal FastAPI endpoint `POST /predict` that takes `{age, sessions, days}` and returns `{churn_probability}`.',
        solution: `\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("churn.pkl")

class Features(BaseModel):
    age: float
    sessions: int
    days: int

@app.post("/predict")
def predict(f: Features):
    proba = model.predict_proba([[f.age, f.sessions, f.days]])[0, 1]
    return {"churn_probability": float(proba)}
\`\`\`

Pydantic validates the input automatically — if the request body is malformed, FastAPI returns 422 without your code running. \`uvicorn main:app\` and you have an API.`
      },
      {
        title: 'Stream tokens to the user',
        prompt:
          'Your LLM endpoint takes 8 seconds to respond. Users think the page is broken. What single change cuts *perceived* latency to under a second without speeding up the model?',
        solution: `**Stream the response.** Send tokens to the client as they\'re generated, so the user starts reading the first word ~300ms after the request, not after all 8 seconds.

\`\`\`python
from fastapi.responses import StreamingResponse

@app.post("/chat")
async def chat(req):
    async def gen():
        async for chunk in await llm.stream(req.messages):
            yield chunk.delta.content or ""
    return StreamingResponse(gen(), media_type="text/plain")
\`\`\`

Total latency unchanged, perceived latency drops by ~7 seconds. Free UX win.`
      }
    ],

    observability: [
      {
        title: 'Design a trace record',
        prompt:
          'List the fields you would log for every LLM call in production, and explain why each one matters.',
        solution: `Minimum useful trace record:

- **timestamp** — ordering and cost-windowing.
- **session_id / user_id** — replay a single user\'s journey when they report a bug.
- **feature / endpoint** — which product surface generated the call.
- **model + version + temperature** — reproduce the exact configuration.
- **prompt_tokens, completion_tokens** — cost & context-window analysis.
- **latency_ms** — performance SLAs.
- **cost_usd** — budget alerts.
- **user_input + system_prompt_version + output** — to grade quality and replay.
- **retrieved_chunks / tools_called** — RAG and agentic traces.

Log to a warehouse (BigQuery, Snowflake, Clickhouse). The day someone asks "why did the bot answer X to user Y on Thursday?", you\'ll have a clean answer in seconds, not days.`
      }
    ]
  },

  // ============== AGENTIC ENGINEER ==============
  agentic: {
    'what-is-an-agent': [
      {
        title: 'Identify the agent loop',
        prompt:
          'In your own words, define the three required pieces of an AI agent. Then explain what is **not** an agent — give a concrete example.',
        solution: `Three required pieces:

1. **An LLM (or other model)** that produces text or actions.
2. **Tools** the model can call to affect the world or fetch information.
3. **A loop** that runs the model, executes its chosen action, feeds the result back, and repeats until done.

**Not an agent:** a one-shot summariser. You send text in, you get a summary out, no tool calls, no loop. That\'s just a model call.

**Is an agent:** a research assistant that calls \`web_search\` → reads results → calls \`summarise\` → checks for missing info → loops. The loop + tools are the agent-defining traits.`
      },
      {
        title: 'When NOT to use an agent',
        prompt:
          'You need to translate English product descriptions into French. Should you build an agent? Why or why not?',
        solution: `**No.** Translation is a single-step, deterministic task — input goes in, output comes out, no tool calls or decisions needed. Wrapping it in an agent loop adds latency (multiple LLM hops), cost (more tokens), and failure modes (the agent might "decide" the translation is bad and re-translate, drifting).

Use a single prompt with a strong translation model. Save the agent pattern for *when the path through the work depends on what the model discovers along the way* — research, debugging, multi-step bookings.`
      }
    ],

    'control-flow': [
      {
        title: 'Critique this system prompt',
        prompt:
          'A teammate\'s system prompt for a support agent: `"Be helpful and answer questions about our product."`. What\'s missing, and what would you add?',
        solution: `What\'s missing: **tools, constraints, error paths, termination conditions, tone**.

A better version:

\`\`\`text
You are a customer-support agent for Acme Corp.

Tools available:
- search_kb(query): search our help centre
- create_ticket(summary, priority): file a support ticket

Behaviour rules:
- Always search_kb BEFORE answering from memory.
- If the user is angry or threatening churn, file a P1 ticket immediately.
- Never invent policy. If unsure, say "Let me check that" and search.
- Keep replies under 4 sentences unless the user asks for detail.
- When the user thanks you or signs off, end the conversation politely.
\`\`\`

The point isn\'t length — it\'s **specificity**. Vague prompts produce vague agents.`
      },
      {
        title: 'Plan a recovery path',
        prompt:
          'Your agent has a `search_kb` tool. Sometimes the tool returns zero hits. Write the prompt rule that prevents the agent from hallucinating an answer in that case.',
        solution: `\`\`\`text
If search_kb returns zero results:
1. Try ONE rephrasing of the query (different keywords).
2. If still zero results, do NOT answer from memory.
   Instead, reply: "I couldn\'t find that in our help centre.
   Would you like me to create a ticket for the team?"
\`\`\`

The fix is having an explicit "I don\'t know" path. Without it, the model will try to please the user — that\'s where hallucinations come from. Bake the escape hatch into the rules and you reduce hallucinations dramatically.`
      }
    ],

    'tool-use': [
      {
        title: 'Sharpen this tool schema',
        prompt:
          'A teammate defined a tool: `{"name": "lookup", "description": "look something up", "parameters": {"type": "object", "properties": {"query": {"type": "string"}}}}`. Rewrite it so the model picks it correctly and fills it well.',
        solution: `\`\`\`json
{
  "name": "search_orders",
  "description": "Search a customer\\u2019s past orders by status or date. Call this whenever the user asks about an order, refund, shipment status, or order history.",
  "parameters": {
    "type": "object",
    "properties": {
      "customer_id": {"type": "string", "description": "The numeric customer ID."},
      "status":      {"type": "string", "enum": ["pending", "shipped", "delivered", "cancelled"]},
      "since":       {"type": "string", "format": "date", "description": "ISO date — only return orders after this."}
    },
    "required": ["customer_id"]
  }
}
\`\`\`

Three changes: a specific name, a description written *for the model* (with trigger phrases), and constraints on values (\`enum\`, \`format\`). The enum alone removes a huge class of "the model invented a status" bugs.`
      },
      {
        title: 'Make a tool idempotent',
        prompt:
          'Your agent can sometimes retry a `send_email` tool, leading to duplicate emails to customers. Design the function signature and behaviour that prevents this without changing the agent.',
        solution: `Add an **idempotency key**:

\`\`\`python
def send_email(idempotency_key: str, to: str, subject: str, body: str) -> dict:
    if recently_sent(idempotency_key):           # check a 24h cache
        return {"status": "already_sent", "id": cached_id(idempotency_key)}
    msg_id = mailer.send(to, subject, body)
    remember(idempotency_key, msg_id)
    return {"status": "sent", "id": msg_id}
\`\`\`

Now if the agent retries with the same key, the tool returns the cached result instead of sending a second email. Same pattern works for \`book_flight\`, \`create_invoice\`, \`charge_card\` — anything that has side effects in the real world.`
      }
    ],

    'structured-output': [
      {
        title: 'Pydantic + retry loop',
        prompt:
          'Write a function that calls an LLM, validates the JSON response against a Pydantic model `Reply`, and retries **once** with the validation error fed back into the prompt if validation fails.',
        solution: `\`\`\`python
from pydantic import BaseModel, ValidationError

class Reply(BaseModel):
    intent: str
    confidence: float

def ask(user_prompt: str, attempts: int = 2) -> Reply:
    feedback = ""
    for _ in range(attempts):
        raw = call_llm(user_prompt + feedback)
        try:
            return Reply.model_validate_json(raw)
        except ValidationError as e:
            feedback = f"\\n\\nYour previous response was invalid:\\n{e}\\nReturn valid JSON only."
    raise RuntimeError("LLM kept producing invalid JSON")
\`\`\`

Feeding the validation error back lets the model self-correct. Success rate after one retry is typically >99% on modern models — without it, you\'re back to regexing free text.`
      }
    ],

    mcp: [
      {
        title: 'Why MCP exists',
        prompt:
          'In one paragraph, explain to a teammate who has never heard of MCP why it matters. Use an analogy.',
        solution: `MCP (Model Context Protocol) is **LSP for AI tools**. Before LSP, every editor had to write a custom integration for every language — Vim+Python, VSCode+Python, JetBrains+Python, each separately. After LSP, you write one Python language server and *every* editor uses it.

MCP does the same for AI agents. Before MCP, every agent framework (LangChain, CrewAI, Cursor, Claude Desktop) needed its own GitHub integration, its own Postgres integration, its own filesystem integration. With MCP, you write one server (e.g. an MCP-Postgres server), and *any* MCP-aware client can use it. That\'s the whole pitch.`
      }
    ],

    'planner-executor': [
      {
        title: 'When to plan, when to improvise',
        prompt:
          'Two tasks: (a) "Book me a flight to Paris next Friday." (b) "Help me debug why my CI pipeline is failing." Which one needs an explicit plan-then-execute split? Why?',
        solution: `**(b) — debugging — needs the plan-then-execute split.**

(a) has a roughly fixed shape: search flights → present options → confirm → book. One agent with a few tools handles it linearly.

(b) is open-ended. The steps depend on what the agent discovers — could be lint errors, flaky tests, missing env vars, broken Docker layer. A planner produces a *hypothesis list* ("check job logs, then test config, then dependencies"), the executor runs each step, and after each step you may need to *re-plan* based on what you found.

Rule of thumb: plan when the path is data-dependent, improvise when it\'s mostly linear.`
      }
    ],

    memory: [
      {
        title: 'Bound a long conversation',
        prompt:
          'A chatbot has been running for 200 messages and the context window is full. What pattern do you use to keep going without losing history?',
        solution: `**Rolling summary + recent buffer.**

Keep the last N raw messages (say, 10) in the context for fine-grained recall. Behind them, store a running **summary** that the model updates every K turns:

\`\`\`python
if len(buffer) > 20:
    summary = llm("Summarise this conversation, preserving any facts the user has stated:\\n" + str(buffer[:10]))
    buffer = buffer[10:]
context = f"Summary so far:\\n{summary}\\n\\nRecent messages:\\n{buffer}"
\`\`\`

This keeps token cost constant regardless of conversation length, while preserving "what the user told me" through the summary. For high-stakes facts (e.g. account number), also persist them to a separate structured store.`
      }
    ],

    evals: [
      {
        title: 'Trajectory vs outcome',
        prompt:
          'Your agent answered the user\'s question correctly, but called the wrong tool and got lucky. Should the eval pass or fail? Why?',
        solution: `**Depends on what you\'re measuring — and you should track both.**

- **Outcome eval** (was the final answer correct?) — passes. The user got what they wanted.
- **Trajectory eval** (did it take the right steps?) — fails. The agent called the wrong tool. Next time the data is different, it may answer incorrectly.

A robust eval suite reports both. A regression in trajectory often *precedes* a regression in outcome — by tracking both, you catch the problem before it bites a real user.`
      },
      {
        title: 'LLM as judge — when?',
        prompt:
          'For which of these eval signals would you use LLM-as-judge, and for which would you use plain string-match? (a) "did tool X get called?" (b) "is the answer semantically correct?" (c) "is the JSON valid?"',
        solution: `- **(a) Tool-called check** → string-match / set membership on the trace. Deterministic and free.
- **(b) Semantic correctness** → LLM-as-judge with a rubric, or human grading on a sample. String-match fails because there are many right phrasings.
- **(c) JSON validity** → schema validation with Pydantic / jsonschema. Deterministic.

Use the cheapest, most reliable check that does the job. LLM-as-judge is powerful but expensive and noisy — reserve it for the soft judgements where rules don\'t work.`
      }
    ],

    'multi-agent': [
      {
        title: 'Defend a single agent',
        prompt:
          'A PM wants you to build "a 6-agent system to write blog posts: ideator → researcher → outliner → drafter → editor → publisher". Argue (politely) for fewer agents.',
        solution: `**Start with one agent and good prompts; reach for multi-agent only when one fails.**

Reasons:

- **Latency**: 6 agents = 6+ LLM round-trips minimum. A single agent does it in 1–2.
- **Cost**: each handoff re-sends context. Total tokens often 3–5× the single-agent cost.
- **Debuggability**: when output is bad, it\'s now ambiguous which agent failed.
- **Hand-off bugs**: each transition is a chance to lose information.

A single strong agent with section-by-section prompts ("ideate → outline → draft → polish") often produces equal or better posts. If quality is genuinely insufficient *after measuring*, then split: usually a "writer" + a "reviewer" is the right next step, not a six-way fan-out.`
      }
    ]
  },

  // ============== FULL-STACK DEVELOPER ==============
  fullstack: {
    'how-web-works': [
      {
        title: 'Trace a request',
        prompt:
          'You type `https://example.com` and press Enter. List the steps from there until pixels appear on the screen, in order. Aim for 6–8 steps.',
        solution: `1. **DNS lookup** — resolve \`example.com\` to an IP.
2. **TCP handshake** — open a connection to that IP.
3. **TLS handshake** — exchange certificates, derive a session key.
4. **HTTP GET** — browser sends \`GET /\` with headers.
5. **Server responds** — HTML returned with a 200 status.
6. **Parse HTML → DOM** — the browser builds the document tree, finding linked CSS/JS/images.
7. **Fetch subresources** — CSS and blocking scripts come down (often in parallel).
8. **Build CSSOM, render tree, layout, paint, composite** — finally pixels.

JavaScript can hydrate or modify the DOM after — that\'s why a slow script delays interactivity.`
      },
      {
        title: 'Status codes quiz',
        prompt:
          'For each scenario, name the most appropriate HTTP status:\n1. Client sent invalid JSON.\n2. User isn\'t logged in.\n3. User is logged in but lacks permission.\n4. Resource was successfully created.\n5. Email already exists during signup.',
        solution: `1. **400** Bad Request — the request itself is malformed (use 422 if it\'s semantically valid JSON but fails business validation).
2. **401** Unauthorized — authentication is missing or invalid.
3. **403** Forbidden — authenticated but not allowed.
4. **201** Created — used on a successful POST that creates a resource. Include a \`Location\` header pointing to the new resource.
5. **409** Conflict — the request conflicts with current state (unique constraint violation).

Returning the right code is good API hygiene — frontends, monitoring, and rate-limiters all depend on it.`
      }
    ],

    'html-css': [
      {
        title: 'Centre a div',
        prompt:
          'Centre a child element both horizontally and vertically inside a 400×400px parent. Use modern CSS — three properties.',
        solution: `\`\`\`css
.parent {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;          /* vertical */
  justify-content: center;      /* horizontal */
}
\`\`\`

Three lines. The "how to centre a div" meme is from 2014; in 2026 it\'s a non-event. Grid works too: \`display: grid; place-items: center;\` is one less property if you\'re feeling minimal.`
      },
      {
        title: 'Two-column layout with a sidebar',
        prompt:
          'Build a layout: 240px-wide sidebar on the left, main content fills the rest. Stack vertically on screens narrower than 700px.',
        solution: `\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}

@media (max-width: 700px) {
  .layout { grid-template-columns: 1fr; }
}
\`\`\`

\`1fr\` means "one fraction of the available space" — perfect for "fill the rest". The media query collapses the grid to a single column on narrow screens. This pattern covers 80% of real two-column layouts.`
      }
    ],

    javascript: [
      {
        title: 'Async/await over .then',
        prompt:
          'Rewrite this nested callback into async/await:\n```js\nfetchUser(id).then(user => {\n  fetchOrders(user.id).then(orders => {\n    console.log(orders[0])\n  })\n})\n```',
        solution: `\`\`\`js
async function show(id) {
  const user = await fetchUser(id)
  const orders = await fetchOrders(user.id)
  console.log(orders[0])
}
\`\`\`

No nesting, easy to wrap in \`try/catch\` for error handling, and \`await\` makes the sequence read top-to-bottom. If \`fetchUser\` and \`fetchOrders\` were *independent*, you\'d use \`Promise.all\` to run them in parallel — but here \`fetchOrders\` needs \`user.id\`, so they must be sequential.`
      },
      {
        title: 'Sum a list of orders',
        prompt:
          'Given `orders = [{amount: 12, paid: true}, {amount: 30, paid: false}, {amount: 8, paid: true}]`, sum the amounts of paid orders only. One line.',
        solution: `\`\`\`js
const total = orders.filter(o => o.paid).reduce((s, o) => s + o.amount, 0)
// 20
\`\`\`

\`filter\` keeps only the paid orders, \`reduce\` accumulates their amounts into a running total starting from 0. This filter-then-reduce pattern is the JS equivalent of SQL\'s \`SELECT SUM(amount) FROM orders WHERE paid = true\`.`
      }
    ],

    'mental-model': [
      {
        title: 'UI = f(state)',
        prompt:
          'Explain in one sentence why "UI is a function of state" matters as a mental model in React.',
        solution: `When UI is a pure function of state, you can reason about *what your UI looks like* by inspecting *one variable* (state) instead of tracing dozens of imperative DOM mutations — every render is just "given this state, return this JSX". That\'s why React feels easier than vanilla DOM-manipulation: bugs become "the state was wrong", which is easier to fix than "the 3rd DOM update conflicted with the 7th".`
      },
      {
        title: 'Props or state?',
        prompt:
          'For each, decide if it should be a prop or state:\n1. The user\'s logged-in name shown in a header.\n2. Whether a dropdown is open.\n3. The current page in a paginated list.\n4. The text the parent passes into a button label.',
        solution: `1. **Prop** — comes from the parent (or a context), not owned by the header.
2. **State** — only this component decides when the dropdown opens.
3. **Either** — state if pagination is local to this list; prop if it\'s controlled from a parent (e.g. shared with a URL).
4. **Prop** — by definition, props are inputs.

Rule of thumb: if the value comes from outside, it\'s a prop. If the component itself decides it, it\'s state. If two siblings need to agree on it, **lift the state up** to their common parent.`
      }
    ],

    hooks: [
      {
        title: 'useEffect with cleanup',
        prompt:
          'Write a `useEffect` that subscribes to `window` resize events on mount and unsubscribes on unmount. Use it to keep a piece of state in sync with `window.innerWidth`.',
        solution: `\`\`\`jsx
const [width, setWidth] = useState(window.innerWidth)

useEffect(() => {
  const onResize = () => setWidth(window.innerWidth)
  window.addEventListener("resize", onResize)
  return () => window.removeEventListener("resize", onResize)
}, [])
\`\`\`

The returned function is the **cleanup**. React runs it when the component unmounts or before the effect re-runs. Forgetting cleanup is the #1 source of subtle React memory leaks — especially with event listeners, timers, and subscriptions.`
      },
      {
        title: 'Build useLocalStorage',
        prompt:
          'Write a custom hook `useLocalStorage(key, initial)` that behaves like `useState` but persists to `localStorage`.',
        solution: `\`\`\`jsx
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [key, val])

  return [val, setVal]
}

// usage:
const [theme, setTheme] = useLocalStorage("theme", "dark")
\`\`\`

The lazy initialiser \`() => ...\` reads from localStorage only once on mount, not every render. The effect writes back every time the value changes. A custom hook is just a function that starts with \`use\` and calls other hooks — that\'s the whole rule.`
      }
    ],

    'node-express': [
      {
        title: 'Reject unauthenticated requests',
        prompt:
          'Write an Express middleware `requireAuth` that reads a Bearer token from `Authorization`, verifies it with `jwt`, and sets `req.user`. Reject with 401 on failure.',
        solution: `\`\`\`js
import jwt from "jsonwebtoken"

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "")
  if (!token) return res.status(401).json({ error: "missing token" })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: "invalid token" })
  }
}

// usage:
app.get("/me", requireAuth, (req, res) => res.json(req.user))
\`\`\`

Middleware is just \`(req, res, next) => ...\`. Call \`next()\` to continue, or send a response to short-circuit. This pattern composes — you can stack \`requireAuth\` with \`requireAdmin\` etc.`
      },
      {
        title: 'Validate the body',
        prompt:
          'Write a `POST /users` endpoint that requires a `name` and an `email` in the body. Return 422 if missing.',
        solution: `\`\`\`js
app.post("/users", (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(422).json({ error: "name and email are required" })
  }
  // ... create user
  res.status(201).json({ id: crypto.randomUUID(), name, email })
})
\`\`\`

For real apps, replace the manual check with a schema library like **zod**: \`UserCreate.parse(req.body)\` validates *and* gives you typed values back, and you can centralise the schema between front-end and back-end.`
      }
    ],

    sql: [
      {
        title: 'Top spenders query',
        prompt:
          'Tables: `users(id, name)` and `orders(id, user_id, amount, status)`. Write a query that returns the top 5 users by *completed*-order spend, with their total.',
        solution: `\`\`\`sql
SELECT u.id, u.name, SUM(o.amount) AS total
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total DESC
LIMIT 5;
\`\`\`

Read it inside-out: **FROM** the two tables joined, **WHERE** only completed orders, **GROUP BY** user, **SELECT** the user + sum, **ORDER BY** the sum descending, **LIMIT 5**. The execution order is also that order — useful to know when SQL gets complex.`
      },
      {
        title: 'Add the right index',
        prompt:
          '`SELECT * FROM orders WHERE user_id = $1 AND status = \'shipped\' ORDER BY created_at DESC` is slow. What single index helps the most?',
        solution: `\`\`\`sql
CREATE INDEX idx_orders_user_status_created
ON orders (user_id, status, created_at DESC);
\`\`\`

A **composite index** in the order of the predicate: \`user_id\` is the equality filter (most selective first), \`status\` further narrows, and \`created_at DESC\` lets Postgres satisfy the \`ORDER BY\` from the index itself — no sort step required. Verify with \`EXPLAIN ANALYZE\` and you\'ll typically see 100–1000× speedup.`
      }
    ],

    deploy: [
      {
        title: 'Deploy a Vite app to Vercel',
        prompt:
          'List the steps to deploy a Vite + React app to Vercel from a GitHub repo, with auto-deploy on every push to main.',
        solution: `1. Push your project to GitHub (already done).
2. \`npm i -g vercel\` (or use the web UI).
3. \`vercel --prod\` from the project root — Vercel auto-detects Vite, builds, and gives you a live URL.
4. In the Vercel dashboard → **Project → Settings → Git**, link the GitHub repo.
5. Done. Every push to \`main\` now triggers a production deploy; every PR gets a unique preview URL.

If you have a custom domain, point its DNS to Vercel (one CNAME) and add it in **Settings → Domains**. HTTPS is automatic.`
      },
      {
        title: 'A minimal CI workflow',
        prompt:
          'Write a `.github/workflows/ci.yml` that, on every push and PR, installs deps, lints, and builds the project on Node 20.',
        solution: `\`\`\`yaml
name: ci
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
\`\`\`

Commit that file to your repo and GitHub Actions runs it automatically. The \`cache: npm\` line cuts install time from ~30 s to ~5 s on subsequent runs. Add \`- run: npm test\` once you have tests.`
      }
    ],

    observability: [
      {
        title: 'Hook up Sentry',
        prompt:
          'Add Sentry to a Node + Express app so that every unhandled exception is captured with a stack trace. Two lines.',
        solution: `\`\`\`js
import * as Sentry from "@sentry/node"
Sentry.init({ dsn: process.env.SENTRY_DSN })
\`\`\`

That\'s it. Sentry hooks into Node\'s \`uncaughtException\` and \`unhandledRejection\` automatically. Any thrown error anywhere in your app now arrives in the Sentry dashboard with the stack trace, the request, the user, and how many times it\'s happened. For Express, add \`app.use(Sentry.Handlers.requestHandler())\` at the top and \`app.use(Sentry.Handlers.errorHandler())\` at the bottom of your middleware chain.`
      }
    ]
  }
}
