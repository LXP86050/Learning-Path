// AI Engineer — complete 0-to-hero guide.
// Chapters → sections → examples (each example is collapsible in the UI).

export const ai = {
  id: 'ai',
  title: 'AI Engineer',
  tagline: 'From the math of a single neuron to deploying production LLM systems.',
  summary:
    'A complete, no-prerequisite guide. We start at vectors and end at retrieval-augmented chatbots. Every section ships with 2–3 hands-on examples you can expand and try.',
  icon: '🧠',
  color: ['#7c5cff', '#22d3ee'],
  tags: ['Python', 'NumPy', 'PyTorch', 'Transformers', 'LLMs', 'RAG'],
  stats: { duration: '~45 hrs', level: 'Beginner → Intermediate', examples: 36 },
  chapters: [
    {
      id: 'foundations',
      title: 'Chapter 1 · Foundations',
      subtitle: 'The math and Python you actually need.',
      sections: [
        {
          id: 'vectors',
          title: 'Vectors: the atom of every AI model',
          intro:
            'A vector is just an ordered list of numbers. That sounds boring — until you realise every input, weight, and output inside an AI model is one. Get fluent with vectors and 80% of ML math suddenly clicks.',
          keypoints: [
            'A vector represents one example (one user, one image, one sentence).',
            'The length of a vector is its dimensionality.',
            'You can add vectors, scale them, and measure how similar they are.'
          ],
          examples: [
            {
              title: 'A user, as a vector',
              summary: 'See how three numbers describe a single person to an ML model.',
              body: `Imagine you want to predict if a user will churn. You don\'t hand the model a name — you hand it features:

\`\`\`python
import numpy as np

# [age_normalised, sessions_last_7d, days_since_last_visit]
user = np.array([0.42, 0.18, 0.83])
print(user.shape)   # (3,)
print(user[1])      # 0.18 → low engagement
\`\`\`

The model never sees "Lokesh". It only ever sees vectors like this. Every dataset of N users is a matrix of shape \`(N, 3)\` — N rows stacked together.`
            },
            {
              title: 'Dot product = similarity score',
              summary: 'The single most important operation in all of ML.',
              body: `Two vectors point in similar directions ⇒ their dot product is large. Opposite directions ⇒ negative. Perpendicular ⇒ zero.

\`\`\`python
import numpy as np

doc_a = np.array([1, 0.8, 0.1])   # talks about ML
doc_b = np.array([0.9, 0.7, 0.0]) # also ML
doc_c = np.array([0.0, 0.1, 0.9]) # cooking

print(np.dot(doc_a, doc_b))  # 1.46  → very similar
print(np.dot(doc_a, doc_c))  # 0.17  → unrelated
\`\`\`

That\'s the entire intuition behind semantic search, recommendation systems, and attention inside Transformers. Three lines of NumPy — billion-dollar idea.`
            },
            {
              title: 'Matrix-vector multiply = applying weights',
              summary: 'How a neural network layer actually works in one expression.',
              body: `A neural network layer is just \`output = weights · input + bias\`.

\`\`\`python
import numpy as np

x = np.array([0.5, -0.2, 0.9])           # input vector
W = np.array([[0.1, 0.4, -0.3],          # weights for 2 output neurons
              [0.7, -0.1, 0.2]])
b = np.array([0.05, -0.1])               # bias

z = W @ x + b
print(z)   # [0.04 0.55]
\`\`\`

\`@\` is NumPy\'s matrix-multiply operator. The same equation runs billions of times when ChatGPT generates a reply — just with much bigger \`W\`.`
            }
          ]
        },
        {
          id: 'python-numpy',
          title: 'Python + NumPy for ML',
          intro:
            'You don\'t need to be a Python expert. You need to be fluent in three libraries — NumPy, Pandas, Matplotlib — and one mindset: vectorise instead of looping.',
          keypoints: [
            'NumPy arrays are C-fast; Python loops are not.',
            'Broadcasting lets you do array math without writing loops.',
            'Pandas is NumPy with labels — perfect for tabular data.'
          ],
          examples: [
            {
              title: 'Loop vs vectorised — the speed difference',
              summary: 'Why every ML codebase avoids for-loops over data.',
              body: `\`\`\`python
import numpy as np, time

n = 1_000_000
a = np.random.rand(n)
b = np.random.rand(n)

t = time.time()
c1 = [a[i] + b[i] for i in range(n)]      # Python loop
print(f"loop:       {time.time()-t:.3f}s")

t = time.time()
c2 = a + b                                # NumPy
print(f"vectorised: {time.time()-t:.3f}s")
\`\`\`

Typical output: loop ≈ 0.25 s, vectorised ≈ 0.003 s — about 80× faster. That gap grows with data size. **Rule:** if you\'re writing a for-loop over a NumPy array, stop and look for the vectorised version first.`
            },
            {
              title: 'Broadcasting in 30 seconds',
              summary: 'How NumPy makes "row + scalar" or "matrix + row" just work.',
              body: `\`\`\`python
import numpy as np
M = np.array([[1, 2, 3],
              [4, 5, 6]])      # shape (2, 3)
row_mean = M.mean(axis=1, keepdims=True)   # shape (2, 1)
print(M - row_mean)
# [[-1.  0.  1.]
#  [-1.  0.  1.]]
\`\`\`

NumPy "stretched" the (2,1) mean across the 3 columns automatically. That\'s broadcasting. It\'s how mean-centering, normalising, and most ML pre-processing is one line of code.`
            }
          ]
        },
        {
          id: 'first-model',
          title: 'Your first model: linear regression',
          intro:
            'Linear regression is the "hello world" of machine learning. Master this and you\'ve already met loss functions, gradient descent, and overfitting — every other model is just a fancier version.',
          keypoints: [
            'Model: ŷ = w·x + b — a line in 1D, a hyperplane in higher dims.',
            'Loss: mean squared error — average squared distance from the line.',
            'Training: nudge w and b to lower the loss.'
          ],
          examples: [
            {
              title: 'Fit a line, by hand',
              summary: 'No sklearn yet — feel what training means.',
              body: `\`\`\`python
import numpy as np
np.random.seed(0)
X = np.linspace(0, 10, 50)
y = 2.5 * X + 1.0 + np.random.randn(50)   # noisy line

w, b = 0.0, 0.0
lr = 0.01
for step in range(2000):
    y_hat = w * X + b
    err   = y_hat - y
    w -= lr * (err * X).mean()
    b -= lr * err.mean()

print(f"w={w:.2f}, b={b:.2f}")   # w≈2.50, b≈1.00
\`\`\`

That\'s gradient descent in 6 lines. Every neural network you ever train is the same loop — just with more parameters and a fancier model.`
            },
            {
              title: 'The same thing with scikit-learn',
              summary: 'How you\'d actually do it in real code.',
              body: `\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

model = LinearRegression().fit(X.reshape(-1, 1), y)
print(model.coef_, model.intercept_)   # ≈ [2.5], 1.0
print(r2_score(y, model.predict(X.reshape(-1, 1))))   # ≈ 0.98
\`\`\`

Real ML code is short because the libraries do the loops for you. The reason to *also* know the by-hand version: when something breaks, you can debug.`
            }
          ]
        }
      ]
    },
    {
      id: 'classical-ml',
      title: 'Chapter 2 · Classical ML',
      subtitle: 'The 90% of ML problems that aren\'t deep learning.',
      sections: [
        {
          id: 'supervised',
          title: 'Supervised learning, the workflow',
          intro:
            'Most production ML is still classical: tabular data, gradient-boosted trees, a clean train/val/test split, and a metric you can defend in a meeting. Learn this loop and you can ship ML at any company.',
          keypoints: [
            'Split data into train / validation / test — never peek at test.',
            'Pick a metric that matches the business: accuracy, F1, AUC, RMSE.',
            'Iterate features and model — validation tells you what\'s working.'
          ],
          examples: [
            {
              title: 'End-to-end classifier in 12 lines',
              summary: 'Titanic-style flow with train/val split and accuracy.',
              body: `\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, f1_score

df = pd.read_csv("titanic.csv")
X = df[["pclass", "age", "sex_male", "fare"]].fillna(0)
y = df["survived"]

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = GradientBoostingClassifier().fit(X_tr, y_tr)
pred  = model.predict(X_te)
print("acc", accuracy_score(y_te, pred))
print("f1 ", f1_score(y_te, pred))
\`\`\`

12 lines, real model, real metric. Now you have a baseline to beat — and improving baselines is 80% of an ML engineer\'s job.`
            },
            {
              title: 'Why we use a *validation* set, not just train + test',
              summary: 'The most common rookie mistake in ML.',
              body: `If you tune hyperparameters by checking the *test* set, you\'ve leaked information from the test set into your decisions. The reported test accuracy is now optimistic — sometimes by 5–10 points.

The fix:
1. **Train** — fit the model.
2. **Validation** — used during development to compare runs and tune.
3. **Test** — touched once, at the very end, only to report the final number.

Cross-validation (5-fold) is the same idea with rotation, used when you don\'t have enough data for a fixed val split.`
            },
            {
              title: 'Picking the right metric',
              summary: 'Accuracy lies on imbalanced data — here\'s what to use instead.',
              body: `Suppose 99% of credit-card transactions are legitimate. A model that predicts "legit" for everything is **99% accurate** and **completely useless**.

| Metric | When to use it |
|---|---|
| **Accuracy** | Roughly balanced classes |
| **Precision** | False positives are expensive (spam filter) |
| **Recall** | False negatives are expensive (cancer screening) |
| **F1** | You want a single number that balances both |
| **AUC** | You\'re ranking outcomes, not labelling |
| **RMSE / MAE** | Regression (continuous target) |

Pick the metric **before** you train. Otherwise you\'ll be tempted to pick the one that flatters your model.`
            }
          ]
        },
        {
          id: 'trees-boosting',
          title: 'Trees, forests, and gradient boosting',
          intro:
            'XGBoost and LightGBM still win most Kaggle competitions on tabular data. They are also the workhorses inside fintech, ads, fraud, and recommender pipelines.',
          keypoints: [
            'A decision tree splits the feature space with if/else rules.',
            'A random forest averages many trees → less overfit, more robust.',
            'Gradient boosting builds trees sequentially, each fixing the previous.'
          ],
          examples: [
            {
              title: 'Boosting beats a single tree',
              summary: 'Watch error fall as you stack more trees.',
              body: `\`\`\`python
from sklearn.datasets import make_classification
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score

X, y = make_classification(n_samples=4000, n_features=20, random_state=0)
for n in [1, 10, 50, 200]:
    m = GradientBoostingClassifier(n_estimators=n, max_depth=3)
    s = cross_val_score(X=X, y=y, estimator=m, cv=5).mean()
    print(f"{n:>3d} trees → acc {s:.3f}")
\`\`\`

Typical output: 1 tree ≈ 0.79, 10 ≈ 0.88, 50 ≈ 0.92, 200 ≈ 0.94. Each new tree corrects the previous one\'s mistakes — that\'s "boosting".`
            },
            {
              title: 'Feature importance for free',
              summary: 'Boosted trees tell you which inputs matter most.',
              body: `\`\`\`python
import pandas as pd
imp = pd.Series(model.feature_importances_, index=X.columns)
print(imp.sort_values(ascending=False).head())
\`\`\`

This is one reason boosting still beats deep learning on most tabular jobs in industry: it\'s **explainable**. You can show a compliance team why the model declined a loan.`
            }
          ]
        }
      ]
    },
    {
      id: 'deep-learning',
      title: 'Chapter 3 · Deep Learning',
      subtitle: 'Neurons, backprop, and PyTorch.',
      sections: [
        {
          id: 'neuron',
          title: 'From neuron to network',
          intro:
            'A "neuron" is a single linear-regression unit followed by a non-linear function. Stack a bunch of them with non-linearities in between and you have a universal function approximator.',
          keypoints: [
            'Neuron: output = activation(w·x + b).',
            'Non-linear activations (ReLU, GELU, sigmoid) make stacking useful.',
            'Backprop is just the chain rule applied to a computation graph.'
          ],
          examples: [
            {
              title: 'A neuron in 4 lines',
              summary: 'One ReLU neuron computed by hand.',
              body: `\`\`\`python
import numpy as np
def neuron(x, w, b):
    return max(0.0, float(np.dot(w, x) + b))    # ReLU

print(neuron([1.0, 2.0], [0.5, -0.3], 0.1))     # → 0.0
print(neuron([1.0, 2.0], [0.5,  0.3], 0.1))     # → 1.2
\`\`\`

That\'s it. Every "neural network" is a stack of millions of these connected together. The "intelligence" emerges from scale, not from any one neuron being clever.`
            },
            {
              title: 'A 2-layer MLP from scratch',
              summary: 'No PyTorch — pure NumPy forward and backward pass.',
              body: `\`\`\`python
import numpy as np
np.random.seed(0)
X = np.random.randn(100, 4)         # 100 examples, 4 features
y = (X.sum(axis=1) > 0).astype(int) # toy label

W1 = np.random.randn(4, 8) * 0.1
W2 = np.random.randn(8, 1) * 0.1
lr = 0.05

def sigmoid(z): return 1 / (1 + np.exp(-z))

for step in range(2000):
    h = np.maximum(0, X @ W1)             # ReLU layer
    p = sigmoid(h @ W2).flatten()         # output prob
    err = p - y
    # backprop (chain rule)
    dW2 = h.T @ err.reshape(-1, 1) / len(X)
    dH  = err.reshape(-1, 1) @ W2.T
    dH[h <= 0] = 0
    dW1 = X.T @ dH / len(X)
    W1 -= lr * dW1
    W2 -= lr * dW2

print("acc:", ((p > 0.5) == y).mean())
\`\`\`

Once you\'ve written this yourself, every deep-learning framework feels like sugar on top.`
            }
          ]
        },
        {
          id: 'pytorch',
          title: 'PyTorch in one page',
          intro:
            'PyTorch is the lingua franca of modern AI research and most production. You need to know four objects: tensors, modules, optimisers, data loaders.',
          keypoints: [
            'Tensors = NumPy arrays + GPU + autograd.',
            'nn.Module wraps trainable parameters and a forward pass.',
            'optim.* updates the parameters using the gradients autograd computed.'
          ],
          examples: [
            {
              title: 'The PyTorch training-loop template',
              summary: 'Memorise this — every project you ever write starts here.',
              body: `\`\`\`python
import torch
from torch import nn, optim

model = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 1))
loss_fn = nn.BCEWithLogitsLoss()
opt     = optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(20):
    for xb, yb in train_loader:
        pred = model(xb).squeeze()
        loss = loss_fn(pred, yb.float())
        opt.zero_grad()
        loss.backward()
        opt.step()
\`\`\`

That five-line inner loop — \`forward → loss → zero_grad → backward → step\` — is the same whether you\'re training a tiny MLP or fine-tuning a 70-billion-parameter LLM.`
            },
            {
              title: 'GPU in one line',
              summary: 'How to actually use that GPU you\'re paying for.',
              body: `\`\`\`python
device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
model.to(device)
xb = xb.to(device); yb = yb.to(device)
\`\`\`

Three details: send the model once, send each batch as it comes in, and watch your training-loop speed go from minutes to seconds. \`mps\` is Apple Silicon\'s GPU backend — handy on a MacBook.`
            }
          ]
        },
        {
          id: 'transformers',
          title: 'The Transformer block — the one model that ate AI',
          intro:
            'Every modern LLM (GPT, Claude, Llama, Gemini) is built from the same block. Understand it once and the next decade of AI papers becomes readable.',
          keypoints: [
            'Self-attention lets each token look at every other token.',
            'Multi-head = several attention computations in parallel.',
            'Residual + layer norm + feed-forward stack the blocks deep.'
          ],
          examples: [
            {
              title: 'Self-attention, minimised',
              summary: 'The famous "Attention is all you need" equation in 8 lines.',
              body: `\`\`\`python
import torch, math

def self_attention(x, Wq, Wk, Wv):
    # x: (seq_len, dim)
    Q = x @ Wq
    K = x @ Wk
    V = x @ Wv
    scores = Q @ K.T / math.sqrt(Q.size(-1))
    weights = torch.softmax(scores, dim=-1)
    return weights @ V
\`\`\`

\`weights[i, j]\` = "how much should token i attend to token j?". The model learns those Q/K/V matrices during training. That\'s the whole secret sauce.`
            },
            {
              title: 'Why softmax(QKᵀ/√d)?',
              summary: 'The intuition behind every weird-looking part of the formula.',
              body: `- **QKᵀ** — dot product of every query with every key → similarity scores.
- **/√d** — without this, dot products blow up for big embedding sizes and softmax saturates (gradients vanish).
- **softmax** — turn raw scores into a probability distribution over keys.
- **× V** — produce a weighted average of values, weighted by attention.

Each token comes out as a *context-aware* version of itself — informed by everything else in the sequence.`
            },
            {
              title: 'Fine-tune a pretrained Transformer (HuggingFace)',
              summary: 'Real-world: don\'t train from scratch, fine-tune.',
              body: `\`\`\`python
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments

tok = AutoTokenizer.from_pretrained("distilbert-base-uncased")
mdl = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)

args = TrainingArguments("out", num_train_epochs=2, per_device_train_batch_size=16, learning_rate=2e-5)
Trainer(model=mdl, args=args, train_dataset=ds_train, eval_dataset=ds_val).train()
\`\`\`

You just fine-tuned a Transformer for sentiment classification. Pretrained weights do 99% of the work — your job is to feed it labelled examples of *your* task.`
            }
          ]
        }
      ]
    },
    {
      id: 'llm-engineering',
      title: 'Chapter 4 · LLM Engineering',
      subtitle: 'Prompting, embeddings, and RAG.',
      sections: [
        {
          id: 'prompting',
          title: 'Prompting like an engineer',
          intro:
            'A prompt is a specification. Treat it like an API contract: role, task, constraints, output format. Vague prompts produce vague answers — every time.',
          keypoints: [
            'System prompt sets identity and rules. User prompt sets the task.',
            'Few-shot examples beat abstract instructions for format adherence.',
            'Chain-of-thought helps reasoning tasks; structured output prevents parse errors.'
          ],
          examples: [
            {
              title: 'Bad prompt vs good prompt',
              summary: 'Same task, two different results.',
              body: `**Bad:**
> Summarise this article.

**Good:**
> You are a financial analyst. Summarise the article below in **exactly 3 bullet points**, each ≤ 20 words, focused on revenue, risk, and outlook. Return JSON: \`{"revenue": "...", "risk": "...", "outlook": "..."}\`.
>
> Article: """..."""

The "good" version specifies role, length, content focus, and output format. Now the response is consumable by code and predictable across runs.`
            },
            {
              title: 'Few-shot beats describing the format',
              summary: 'Show the model what you want, don\'t explain it.',
              body: `\`\`\`text
Convert each request to a SQL query.

Request: "active users last 7 days"
SQL: SELECT COUNT(*) FROM users WHERE last_login > NOW() - INTERVAL '7 days';

Request: "revenue by country in 2025"
SQL: SELECT country, SUM(amount) FROM orders WHERE year = 2025 GROUP BY country;

Request: "top 10 products by units sold"
SQL:
\`\`\`

Two examples, then the model continues the pattern. Often more reliable than a paragraph of "the SQL must use this style and...".`
            },
            {
              title: 'Force structured output with JSON schema',
              summary: 'How to never parse free-text in production code.',
              body: `Modern APIs (OpenAI, Anthropic, Gemini) accept a JSON schema. The model is constrained to produce output that validates against it.

\`\`\`python
schema = {
  "type": "object",
  "properties": {
    "sentiment": {"type": "string", "enum": ["pos", "neg", "neu"]},
    "confidence": {"type": "number", "minimum": 0, "maximum": 1}
  },
  "required": ["sentiment", "confidence"]
}
\`\`\`

Now downstream code can do \`result["sentiment"]\` without try/except gymnastics. If the model fails the schema, retry with the validation error fed back in. Reliability problem ≈ solved.`
            }
          ]
        },
        {
          id: 'embeddings',
          title: 'Embeddings and vector databases',
          intro:
            'Embeddings convert text (or images, or code) into vectors where similar things land near each other. Vector databases let you search those vectors at scale. Together they unlock RAG, semantic search, and clustering.',
          keypoints: [
            'Same embedding model for both your docs and your queries.',
            'Cosine similarity is the usual distance metric.',
            'Chunk your documents — embeddings on whole books are too coarse.'
          ],
          examples: [
            {
              title: 'Embed three sentences and rank them',
              summary: '"Find the closest doc to a query" in 8 lines.',
              body: `\`\`\`python
from openai import OpenAI
import numpy as np
client = OpenAI()

texts = [
    "How do I reset my password?",
    "Where is the office located?",
    "I want to change my login credentials.",
]
embs = [client.embeddings.create(input=t, model="text-embedding-3-small").data[0].embedding for t in texts]
embs = np.array(embs)

query = "I forgot my password"
qv = np.array(client.embeddings.create(input=query, model="text-embedding-3-small").data[0].embedding)
sims = embs @ qv / (np.linalg.norm(embs, axis=1) * np.linalg.norm(qv))
print(np.argsort(-sims))   # [0, 2, 1]
\`\`\`

The model never saw the word "reset" inside the second sentence, yet it ranked it second-closest to the query. That\'s the embedding magic.`
            },
            {
              title: 'Chunking strategies that don\'t suck',
              summary: 'How to split a 200-page PDF for retrieval.',
              body: `Naive: split every 1000 characters. Problem: sentences get cut mid-thought.

Better:
1. **Recursive split** — try paragraph breaks first, then sentences, then characters.
2. **Overlap** — each chunk includes the last 50–100 tokens of the previous one, so context isn\'t lost at boundaries.
3. **Metadata** — store \`(doc_id, page, section_heading)\` with each chunk so you can show the source in the UI.

LangChain\'s \`RecursiveCharacterTextSplitter\` and LlamaIndex\'s node parsers do this for you out of the box.`
            }
          ]
        },
        {
          id: 'rag',
          title: 'Retrieval-Augmented Generation (RAG)',
          intro:
            'RAG is the standard pattern for "chat with my data". Embed → store → retrieve → ground → generate. Once you can build a RAG pipeline, you can ship 80% of LLM features companies actually want.',
          keypoints: [
            'Retrieve at query time — don\'t stuff everything into the prompt.',
            'Always cite sources. It boosts trust and lets you debug.',
            'Evaluate with a small golden set, not vibes.'
          ],
          examples: [
            {
              title: 'Minimal RAG in 25 lines',
              summary: 'End-to-end: embed → store → retrieve → answer.',
              body: `\`\`\`python
from openai import OpenAI
import numpy as np
client = OpenAI()

docs = [open(p).read() for p in ["faq.md", "policy.md", "pricing.md"]]
def embed(t): return np.array(client.embeddings.create(input=t, model="text-embedding-3-small").data[0].embedding)
doc_embs = np.array([embed(d) for d in docs])

def ask(q, k=2):
    qv = embed(q)
    sims = doc_embs @ qv / (np.linalg.norm(doc_embs, axis=1) * np.linalg.norm(qv))
    top  = np.argsort(-sims)[:k]
    ctx  = "\\n---\\n".join(docs[i] for i in top)
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Answer using ONLY the context. If unsure, say so."},
            {"role": "user", "content": f"Context:\\n{ctx}\\n\\nQuestion: {q}"}
        ]
    )
    return resp.choices[0].message.content

print(ask("What is the refund window?"))
\`\`\`

That\'s the entire pattern. Swap in pgvector or Pinecone when you have millions of chunks; the structure stays identical.`
            },
            {
              title: 'Evaluating a RAG system',
              summary: 'How to know if it actually works.',
              body: `Build a golden set: 30–100 (question, expected_answer, expected_sources) triples that a domain expert wrote. Then on every prompt or model change, run:

1. **Retrieval recall** — did we fetch a chunk that actually contains the answer?
2. **Answer correctness** — does the generated answer match the expected one? (Use LLM-as-judge or human-grade a sample.)
3. **Faithfulness** — does the answer use only the retrieved context, with no hallucination?

Track these in CI. The day a deploy drops retrieval recall by 10%, you\'ll know before users do.`
            }
          ]
        }
      ]
    },
    {
      id: 'production',
      title: 'Chapter 5 · Production',
      subtitle: 'Deploy, observe, and not break things.',
      sections: [
        {
          id: 'serving',
          title: 'Serving an AI feature',
          intro:
            'A model on your laptop is a demo. A model behind an API, with auth, rate limits, logging, and rollback, is a product. The gap between those two is most of AI engineering.',
          keypoints: [
            'Wrap your model in FastAPI / a serverless function — never a notebook in production.',
            'Cache aggressively: embeddings are expensive, deterministic responses are free.',
            'Stream responses for any LLM-backed feature — users feel latency before they read.'
          ],
          examples: [
            {
              title: 'FastAPI endpoint for a model',
              summary: 'Production-shaped service in under 30 lines.',
              body: `\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("churn.pkl")

class User(BaseModel):
    age: float
    sessions_7d: int
    days_since: int

@app.post("/predict")
def predict(u: User):
    proba = model.predict_proba([[u.age, u.sessions_7d, u.days_since]])[0, 1]
    return {"churn_probability": float(proba)}
\`\`\`

\`uvicorn main:app\` and you have an API. Put it behind nginx or a serverless platform and you\'ve shipped.`
            },
            {
              title: 'Streaming an LLM response',
              summary: 'Perceived latency drops from "slow" to "instant".',
              body: `\`\`\`python
@app.post("/chat")
async def chat(req: ChatReq):
    async def gen():
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=req.messages,
            stream=True
        )
        async for chunk in stream:
            yield chunk.choices[0].delta.content or ""
    return StreamingResponse(gen(), media_type="text/plain")
\`\`\`

The first token arrives in ~300 ms; the user is already reading by the time the full reply finishes. This single change is the difference between a feature that feels broken and one that feels fast.`
            }
          ]
        },
        {
          id: 'observability',
          title: 'Observability for AI',
          intro:
            'Non-determinism makes debugging hard. The fix is tracing: log every prompt, every response, every tool call, every cost. Future-you trying to reproduce a bug from a user report will thank you.',
          keypoints: [
            'Log inputs, outputs, model id, temperature, tokens, latency, cost.',
            'Tag traces with a session id so you can replay user journeys.',
            'Set alerts on cost spikes and on quality-eval regressions.'
          ],
          examples: [
            {
              title: 'A minimal trace record',
              summary: 'The fields you\'ll wish you had logged.',
              body: `\`\`\`json
{
  "ts": "2026-05-27T03:14:00Z",
  "session_id": "u_4f9a",
  "feature": "support-bot",
  "model": "claude-haiku-4-5",
  "prompt_tokens": 1840,
  "completion_tokens": 230,
  "latency_ms": 980,
  "cost_usd": 0.0021,
  "user_input": "...",
  "system_prompt_version": "v12",
  "tools_called": ["search_kb"],
  "retrieved_chunks": ["faq#12", "policy#3"],
  "output": "..."
}
\`\`\`

Logging this to a warehouse (BigQuery, Snowflake) lets you slice by user, model, prompt version, anything. It\'s the single highest-leverage thing you can add to an LLM app early.`
            }
          ]
        }
      ]
    }
  ]
}
