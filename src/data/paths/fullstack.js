// Full-Stack Developer — complete 0-to-hero guide.

export const fullstack = {
  id: 'fullstack',
  title: 'Full-Stack Developer',
  tagline: 'Build, ship, and operate a complete web app — front to back.',
  summary:
    'A no-fluff guide from HTML basics to a deployed full-stack app with auth, a database, and CI. Every section has 2–3 expandable examples with real code you can paste and run.',
  icon: '🛠️',
  color: ['#f472b6', '#7c5cff'],
  tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Cloud'],
  stats: { duration: '~50 hrs', level: 'Complete beginner OK', examples: 38 },
  chapters: [
    {
      id: 'web-platform',
      title: 'Chapter 1 · The Web Platform',
      subtitle: 'How the browser actually works.',
      sections: [
        {
          id: 'how-web-works',
          title: 'What happens when you press Enter on a URL?',
          intro:
            'Knowing the lifecycle of a request makes you a better engineer. You\'ll debug faster, optimise smarter, and stop guessing.',
          keypoints: [
            'DNS resolves the name to an IP.',
            'TCP + TLS open a secure connection.',
            'HTTP request goes out, HTML comes back.',
            'Browser parses, fetches subresources, renders.'
          ],
          examples: [
            {
              title: 'See it with curl',
              summary: 'Make the request yourself, no browser.',
              body: `\`\`\`bash
$ curl -v https://example.com
*   Trying 93.184.216.34:443...
* Connected to example.com (93.184.216.34) port 443
* SSL connection using TLSv1.3
> GET / HTTP/2
> Host: example.com
> User-Agent: curl/8.4.0
< HTTP/2 200
< content-type: text/html
< ...
<!doctype html>
<html>...
\`\`\`

You just did everything the browser does, minus the rendering. The header lines starting with \`>\` are your request; \`<\` are the response.`
            },
            {
              title: 'The render pipeline in 5 steps',
              summary: 'What the browser does after it has the HTML.',
              body: `1. **Parse HTML → DOM tree.** Tags become nodes.
2. **Parse CSS → CSSOM.** Stylesheets become a tree of style rules.
3. **Build render tree.** Combine DOM + CSSOM; drop invisible nodes.
4. **Layout.** Compute geometry — where every box lives.
5. **Paint + composite.** Fill pixels, hand to the GPU.

JavaScript can interrupt at any point — that\'s why a slow script blocks rendering. Open DevTools → Performance and you can watch this happen frame by frame.`
            },
            {
              title: 'HTTP status codes you actually use',
              summary: 'The short list — memorise these.',
              body: `| Code | Meaning |
|---|---|
| **200** | OK |
| **201** | Created (after a POST) |
| **204** | No content (success, nothing to send back) |
| **301 / 302** | Redirect (permanent / temporary) |
| **400** | Bad request — client sent garbage |
| **401** | Unauthorised — not logged in |
| **403** | Forbidden — logged in, not allowed |
| **404** | Not found |
| **409** | Conflict (e.g. unique constraint) |
| **422** | Validation failed |
| **500** | Server crashed |
| **503** | Service unavailable (overload, maintenance) |

Returning the right code is API hygiene. Frontends and tools depend on it.`
            }
          ]
        },
        {
          id: 'html-css',
          title: 'HTML + CSS without the bad parts',
          intro:
            'Semantic HTML and a small CSS toolkit (flex, grid, custom properties) cover 90% of layouts. Skip the historical baggage.',
          keypoints: [
            'Use the right element. \`<button>\` is not a styled \`<div>\`.',
            'Flex for 1-dimensional layouts, Grid for 2-dimensional.',
            'CSS custom properties make theming trivial.'
          ],
          examples: [
            {
              title: 'A semantic page skeleton',
              summary: 'The structure every site should start from.',
              body: `\`\`\`html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lokesh\\u2019s blog</title>
</head>
<body>
  <header><nav>...</nav></header>
  <main>
    <article>
      <h1>Title</h1>
      <p>Body text.</p>
    </article>
  </main>
  <footer>\\u00a9 2026</footer>
</body>
</html>
\`\`\`

\`<header>\`, \`<main>\`, \`<article>\`, \`<footer>\` are landmarks for screen readers and search engines. Free accessibility and SEO — use them.`
            },
            {
              title: 'Flexbox in one snippet',
              summary: 'Centre something. Yes, just like that.',
              body: `\`\`\`css
.row {
  display: flex;
  align-items: center;        /* vertical */
  justify-content: space-between;  /* horizontal */
  gap: 16px;                  /* space between children */
}
\`\`\`

If you ever see "how to vertically centre a div" memes, this is the punchline. The meme is from 2014; in 2026 it\'s three CSS properties.`
            },
            {
              title: 'CSS Grid for page layout',
              summary: 'Two columns + sidebar in 4 lines.',
              body: `\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

\`240px 1fr\` = fixed 240-pixel sidebar, remaining space goes to main. \`1fr\` is "one fraction of the leftover" — magical.`
            }
          ]
        },
        {
          id: 'javascript',
          title: 'JavaScript fundamentals',
          intro:
            'JavaScript has a weird reputation, but modern JS (ES2020+) is a fine language. Learn the small set of features you\'ll actually use every day; ignore the legacy.',
          keypoints: [
            'Use \`const\` by default, \`let\` when you must reassign, never \`var\`.',
            'Arrow functions for callbacks; classic functions for methods that need \`this\`.',
            'Async/await over .then chains — same semantics, much easier to read.'
          ],
          examples: [
            {
              title: 'The "essential JS" cheat sheet',
              summary: 'Eight features that cover most code.',
              body: `\`\`\`js
// 1. Destructuring
const { name, age } = user
const [first, ...rest] = items

// 2. Spread
const merged = { ...defaults, ...overrides }
const moreItems = [...items, "new"]

// 3. Template literals
const msg = \`Hi \${name}, you have \${count} messages\`

// 4. Optional chaining + nullish coalescing
const city = user?.address?.city ?? "Unknown"

// 5. Array methods
const adults = users.filter(u => u.age >= 18)
const names  = adults.map(u => u.name)
const total  = orders.reduce((sum, o) => sum + o.amount, 0)

// 6. Async/await
async function load() {
  const res = await fetch("/api/users")
  return res.json()
}

// 7. Promises in parallel
const [a, b] = await Promise.all([fetchA(), fetchB()])

// 8. Modules
// file: math.js → export function add(a, b) { return a + b }
// file: app.js  → import { add } from "./math.js"
\`\`\`

If you\'re solid on these eight, you can read 95% of modern JS codebases.`
            },
            {
              title: 'Async/await vs callbacks',
              summary: 'Why your code stopped looking like a staircase.',
              body: `**Callback era (don\'t):**
\`\`\`js
fetchUser(id, (user) => {
  fetchOrders(user.id, (orders) => {
    fetchItems(orders[0].id, (items) => {
      console.log(items)
    })
  })
})
\`\`\`

**Today:**
\`\`\`js
const user   = await fetchUser(id)
const orders = await fetchOrders(user.id)
const items  = await fetchItems(orders[0].id)
console.log(items)
\`\`\`

Same logic, no nesting, easy to try/catch. Always use the second form.`
            }
          ]
        }
      ]
    },
    {
      id: 'react',
      title: 'Chapter 2 · React',
      subtitle: 'Component thinking and hooks.',
      sections: [
        {
          id: 'mental-model',
          title: 'React in one sentence',
          intro:
            'React renders a tree of components from state. When state changes, React diffs the new tree against the old and applies the minimum number of DOM mutations. That\'s the entire framework.',
          keypoints: [
            'UI is a function of state: \`UI = f(state)\`.',
            'Components are just functions that return JSX.',
            'Hooks are how components get state and side effects.'
          ],
          examples: [
            {
              title: 'A counter component, annotated',
              summary: 'The classic hello-world — but explained.',
              body: `\`\`\`jsx
import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
\`\`\`

\`useState(0)\` returns a pair: the current value and a setter. Calling the setter schedules a re-render — React will call \`Counter()\` again, this time with \`count = 1\`. Every time. That\'s it.`
            },
            {
              title: 'Props vs state',
              summary: 'The most-asked beginner question.',
              body: `- **Props** are inputs from the parent. The component doesn\'t own them.
- **State** is owned by the component. Only the component can change it.

\`\`\`jsx
function Greeting({ name }) {            // name is a prop
  const [waved, setWaved] = useState(false) // waved is state
  return (
    <div onClick={() => setWaved(true)}>
      Hi {name} {waved && "\\u{1F44B}"}
    </div>
  )
}
\`\`\`

Rule of thumb: if a value comes from outside the component, it\'s a prop. If the component decides it, it\'s state.`
            }
          ]
        },
        {
          id: 'hooks',
          title: 'Hooks you\'ll actually use',
          intro:
            'There are ten official hooks. You\'ll use four daily and the rest occasionally. Focus on those four.',
          keypoints: [
            '\`useState\` — local state.',
            '\`useEffect\` — side effects (fetch, subscribe, log).',
            '\`useMemo\` / \`useCallback\` — perf optimisations, only when measured.',
            '\`useRef\` — mutable value that survives re-renders without triggering one.'
          ],
          examples: [
            {
              title: 'useEffect: fetch data on mount',
              summary: 'The canonical pattern, with cleanup.',
              body: `\`\`\`jsx
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch("/api/users", { signal: ctrl.signal })
      .then(r => r.json())
      .then(setUsers)
      .finally(() => setLoading(false))
    return () => ctrl.abort()      // cleanup if component unmounts
  }, [])                            // empty deps → run once on mount

  if (loading) return <p>Loading\\u2026</p>
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
\`\`\`

The cleanup (\`ctrl.abort()\`) prevents a memory leak if the user navigates away mid-fetch. This is the right way to do it.`
            },
            {
              title: 'Custom hooks',
              summary: 'How you share stateful logic between components.',
              body: `\`\`\`jsx
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)) }, [key, val])
  return [val, setVal]
}

// usage:
const [theme, setTheme] = useLocalStorage("theme", "dark")
\`\`\`

A custom hook is just a function whose name starts with \`use\` and that calls other hooks. That\'s the whole rule. Massive reusability win.`
            }
          ]
        }
      ]
    },
    {
      id: 'backend',
      title: 'Chapter 3 · Backend & Database',
      subtitle: 'Node.js, REST, and SQL.',
      sections: [
        {
          id: 'node-express',
          title: 'A REST API with Node + Express',
          intro:
            'You don\'t need a giant framework. Express + a database is enough to build real apps. Add Fastify if you outgrow it; most projects never do.',
          keypoints: [
            'Routes map HTTP method + path to a handler.',
            'Middleware runs before handlers — auth, logging, parsing.',
            'Always validate input. Never trust the client.'
          ],
          examples: [
            {
              title: 'Hello-world API',
              summary: 'A working server in 12 lines.',
              body: `\`\`\`js
import express from "express"

const app = express()
app.use(express.json())

app.get("/health", (req, res) => res.json({ ok: true }))

app.post("/users", (req, res) => {
  const { name } = req.body
  if (!name) return res.status(422).json({ error: "name required" })
  res.status(201).json({ id: crypto.randomUUID(), name })
})

app.listen(3000, () => console.log("up on :3000"))
\`\`\`

\`npm i express\`, \`node server.js\`, and you have an API. \`/health\` is your liveness probe; deployment platforms (Render, Fly.io) will hit it.`
            },
            {
              title: 'Middleware for auth',
              summary: 'How to gate routes behind a logged-in user.',
              body: `\`\`\`js
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "")
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: "invalid token" })
  }
}

app.get("/me", requireAuth, (req, res) => res.json(req.user))
\`\`\`

Middleware is just \`(req, res, next) => ...\`. Call \`next()\` to continue, or send a response to short-circuit. Express\'s entire power is composing these.`
            }
          ]
        },
        {
          id: 'sql',
          title: 'SQL fundamentals with Postgres',
          intro:
            'SQL has been the standard for 50 years and isn\'t going anywhere. If you can read a join and write a where clause, you can debug 80% of backend problems.',
          keypoints: [
            'Tables, rows, columns, primary keys, foreign keys.',
            'SELECT / INSERT / UPDATE / DELETE — the four CRUD operations.',
            'Joins combine tables on a matching column.'
          ],
          examples: [
            {
              title: 'A real query',
              summary: 'Top 5 customers by lifetime spend.',
              body: `\`\`\`sql
SELECT u.id, u.name, SUM(o.amount) AS lifetime_spend
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY lifetime_spend DESC
LIMIT 5;
\`\`\`

Read it inside-out: join orders onto users, keep completed ones, group by user, sum amounts, sort. SQL reads almost like English once you internalise the order: \`FROM → WHERE → GROUP BY → SELECT → ORDER BY → LIMIT\`.`
            },
            {
              title: 'Indexes make queries fast',
              summary: 'The most common backend perf fix.',
              body: `\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;
-- Seq Scan on orders  (cost=..rows=...) (actual time=120 ms)

CREATE INDEX idx_orders_user_id ON orders(user_id);

EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;
-- Index Scan using idx_orders_user_id  (actual time=0.4 ms)
\`\`\`

300× faster. Always run \`EXPLAIN ANALYZE\` on slow queries — it\'ll tell you whether you need an index, a different join order, or a rewrite.`
            },
            {
              title: 'Transactions in 30 seconds',
              summary: 'Atomic multi-statement operations.',
              body: `\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
\`\`\`

If anything between BEGIN and COMMIT fails, the whole thing rolls back. This is how money moves without going missing.`
            }
          ]
        }
      ]
    },
    {
      id: 'deploy-operate',
      title: 'Chapter 4 · Deploy & Operate',
      subtitle: 'Get it on the internet, keep it running.',
      sections: [
        {
          id: 'deploy',
          title: 'Deploying a full-stack app',
          intro:
            'Modern hosting platforms (Vercel, Netlify, Render, Fly.io, Railway) make deployment a one-liner. You don\'t need to learn Kubernetes to ship your side project.',
          keypoints: [
            'Frontend (static): Vercel / Netlify / Cloudflare Pages.',
            'Backend (server): Render / Fly.io / Railway / AWS App Runner.',
            'Database: managed Postgres (Neon, Supabase, Render).'
          ],
          examples: [
            {
              title: 'Vercel deploy in two commands',
              summary: 'No config — Vercel auto-detects Vite / Next.',
              body: `\`\`\`bash
$ npm i -g vercel
$ vercel --prod
\`\`\`

It asks once whether to link to a project, builds, and gives you a live URL. Linking the project to GitHub means every \`git push\` deploys automatically — actual zero-effort CI/CD.`
            },
            {
              title: 'GitHub Actions for CI',
              summary: 'Lint, test, build on every push.',
              body: `\`\`\`yaml
# .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
\`\`\`

Drop this file in \`.github/workflows/\` and push. GitHub now runs your tests on every PR. Free, fast, no excuse not to.`
            }
          ]
        },
        {
          id: 'observability',
          title: 'Observability: logs, metrics, errors',
          intro:
            'You don\'t need a full observability stack for a side project. You do need three things: structured logs, an error tracker, and an uptime check.',
          keypoints: [
            'Log JSON, not plaintext — searchable later.',
            'Send exceptions to Sentry (free tier is generous).',
            'Set up an uptime monitor (UptimeRobot, BetterStack) — you\'ll know before users.'
          ],
          examples: [
            {
              title: 'Sentry in one line',
              summary: 'Catch every unhandled error, with a stack trace.',
              body: `\`\`\`js
import * as Sentry from "@sentry/node"
Sentry.init({ dsn: process.env.SENTRY_DSN })
\`\`\`

Throw an exception anywhere in your app and Sentry shows you the stack trace, the request, the user, and how many times it\'s happened. Most expensive line of code for the value it returns is, oddly, this one.`
            }
          ]
        }
      ]
    }
  ]
}
