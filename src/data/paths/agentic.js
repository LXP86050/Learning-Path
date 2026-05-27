// Agentic Engineer — complete 0-to-hero guide.

export const agentic = {
  id: 'agentic',
  title: 'Agentic Engineer',
  tagline: 'Design AI agents that reason, use tools, and complete real work.',
  summary:
    'Go beyond chat completions. Learn how agents plan, call tools, recover from failure, and coordinate in teams. Every section has 2–3 expandable, code-first examples.',
  icon: '🤖',
  color: ['#22d3ee', '#4ade80'],
  tags: ['LLMs', 'Tool use', 'LangGraph', 'MCP', 'Evals'],
  stats: { duration: '~35 hrs', level: 'Some Python helpful', examples: 28 },
  chapters: [
    {
      id: 'mental-model',
      title: 'Chapter 1 · The Agent Mental Model',
      subtitle: 'What an "agent" actually is.',
      sections: [
        {
          id: 'what-is-an-agent',
          title: 'What is an AI agent?',
          intro:
            'An agent is an LLM in a loop with tools and memory. That\'s the whole definition. Everything else — frameworks, multi-agent systems, "AGI roadmaps" — is variations on that one structure.',
          keypoints: [
            'Loop: the model produces an action, the system runs it, the result goes back to the model.',
            'Tools: functions the model can call (search, code-run, database, send email).',
            'Memory: the conversation so far, plus optional long-term storage.'
          ],
          examples: [
            {
              title: 'A hand-rolled agent loop in 20 lines',
              summary: 'No framework. See exactly what every agent library is doing under the hood.',
              body: `\`\`\`python
from openai import OpenAI
client = OpenAI()

tools = {"add": lambda a, b: a + b, "mult": lambda a, b: a * b}
messages = [{"role": "system", "content": "Use add/mult tools to answer."}]

def step(user_msg):
    messages.append({"role": "user", "content": user_msg})
    while True:
        resp = client.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=TOOL_SCHEMAS)
        msg = resp.choices[0].message
        messages.append(msg)
        if not msg.tool_calls:
            return msg.content
        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            result = tools[call.function.name](**args)
            messages.append({"role": "tool", "tool_call_id": call.id, "content": str(result)})

print(step("what is (3 + 4) * 5?"))
\`\`\`

That \`while True\` is **the agent**. LangChain, LangGraph, CrewAI, AutoGen — all of them are convenience wrappers around this loop.`
            },
            {
              title: 'The ReAct pattern',
              summary: 'Reasoning + Acting, interleaved.',
              body: `Originally a research paper, now the dominant agent design. The model is prompted to think out loud, then act:

\`\`\`text
Question: Who is older — Anthropic or OpenAI?

Thought: I should look up the founding dates of each.
Action: web_search("when was Anthropic founded")
Observation: Anthropic was founded in 2021.

Thought: Now I need OpenAI\'s founding date.
Action: web_search("when was OpenAI founded")
Observation: OpenAI was founded in 2015.

Thought: 2015 < 2021, so OpenAI is older.
Answer: OpenAI is older — founded in 2015, vs Anthropic in 2021.
\`\`\`

Externalising reasoning makes the trace inspectable and the model more reliable. Almost every production agent uses some flavour of this.`
            },
            {
              title: 'When NOT to build an agent',
              summary: 'The boring but essential question.',
              body: `If your task is:
- **Single-step** (classify, summarise, translate) — just a prompt, no agent needed.
- **Deterministic** (the workflow is the same every time) — write code, call the LLM at one or two points.
- **Latency-critical** (<200ms) — agents have multiple LLM round-trips and will be slow.

You use an agent when the path through the work is *data-dependent* — e.g., "research X" or "fix this bug". The model needs to *decide* what to do next based on what it sees.`
            }
          ]
        },
        {
          id: 'control-flow',
          title: 'Control flow: prompts that direct behaviour',
          intro:
            'You don\'t code an agent\'s behaviour — you instruct it. Treat your system prompt as a constitution. Be specific, give examples, and tell it what to do when things go wrong.',
          keypoints: [
            'State role, capabilities, constraints, and termination conditions.',
            'Give the agent a clear "I don\'t know" path so it doesn\'t hallucinate.',
            'Version your system prompts like code — track which version produced which trace.'
          ],
          examples: [
            {
              title: 'A solid system prompt',
              summary: 'The structure that scales from toy demos to production.',
              body: `\`\`\`text
You are a customer-support agent for Acme Corp.

# Tools you have
- search_kb(query): search the help centre.
- create_ticket(summary, priority): file a support ticket.

# How to behave
- Always try search_kb FIRST before answering from memory.
- If the user is frustrated or angry, file a P1 ticket immediately.
- Never make up policy details. If unsure, say "Let me check that" and search.
- Keep responses under 4 sentences unless the user asks for detail.

# When to stop
- The user thanks you or signs off → respond briefly and stop.
- The same question has been asked 3 times → escalate to a human ticket.
\`\`\`

Notice: it doesn\'t describe *what* an agent is. It tells the model exactly *how to act*. That\'s the only thing the model needs.`
            },
            {
              title: 'Recovery instructions matter more than capabilities',
              summary: 'Good agents are mostly about handling failure gracefully.',
              body: `Most agent bugs aren\'t "the model is dumb". They\'re "the model didn\'t know what to do when the tool returned junk". Bake recovery into the prompt:

> If \`search_kb\` returns no results, **do not invent an answer**. Try one rephrasing. If still empty, reply: "I couldn\'t find that in our help centre — would you like me to create a ticket?"

> If a tool errors twice in a row, stop calling it and inform the user.

Two sentences. Stops 90% of "weird agent behaviour" complaints.`
            }
          ]
        }
      ]
    },
    {
      id: 'tools-and-output',
      title: 'Chapter 2 · Tools & Structured Output',
      subtitle: 'Give the model hands; constrain what comes back.',
      sections: [
        {
          id: 'tool-use',
          title: 'Designing tools the model can use',
          intro:
            'A tool is a function the model can call. The art is naming, describing, and shaping arguments so the model picks the right one and fills it correctly the first time.',
          keypoints: [
            'Name tools like APIs: \`search_orders\`, not \`do_thing_1\`.',
            'Descriptions are read by the model — write them for an LLM, not a human.',
            'Fewer, sharper tools beat dozens of overlapping ones.'
          ],
          examples: [
            {
              title: 'A clean tool schema',
              summary: 'OpenAI / Anthropic compatible function declaration.',
              body: `\`\`\`json
{
  "type": "function",
  "function": {
    "name": "search_orders",
    "description": "Search a customer\\u2019s orders by status or date range. Use this whenever the user asks about past orders.",
    "parameters": {
      "type": "object",
      "properties": {
        "customer_id": {"type": "string"},
        "status":      {"type": "string", "enum": ["pending", "shipped", "delivered", "cancelled"]},
        "since":       {"type": "string", "format": "date"}
      },
      "required": ["customer_id"]
    }
  }
}
\`\`\`

Note the enum on \`status\`. Constraining the type means the model can\'t hallucinate "in-transit-ish" — it must pick one of the four. This is your cheapest reliability win.`
            },
            {
              title: 'Parallel tool calls',
              summary: 'Have the agent fetch independent things at once, not sequentially.',
              body: `Modern model APIs allow multiple tool calls in a single turn:

\`\`\`python
tool_calls = [
  {"name": "weather", "args": {"city": "Seattle"}},
  {"name": "weather", "args": {"city": "Austin"}},
  {"name": "calendar", "args": {"date": "2026-05-27"}}
]
\`\`\`

You execute them in parallel and return all results to the model in the next turn. **Cuts latency by 3–4× on multi-fact questions.** Always check whether your framework actually fires these in parallel — many do them serially by default.`
            },
            {
              title: 'Tools should be idempotent or report it',
              summary: 'A subtle bug that costs companies money.',
              body: `If the model retries — and it will — non-idempotent tools cause double bookings, duplicate emails, duplicate charges.

Two patterns:
1. **Make the tool idempotent** — \`book_flight(idempotency_key, ...)\` rejects duplicates.
2. **Make the tool return state** — \`send_email\` returns \`{status: "already_sent", message_id: ...}\` if the same content went out in the last 60s.

Either is fine; doing neither is how an agent emails your CFO twelve times.`
            }
          ]
        },
        {
          id: 'structured-output',
          title: 'Structured output without try/except hell',
          intro:
            'Free-text from an LLM is unparseable in production. Force JSON, validate with a schema, and reflect failures back into the prompt for one retry.',
          keypoints: [
            'Use the model API\'s native JSON / tool-use mode — not regex on free text.',
            'Validate with Pydantic / zod. Treat schema violations as bugs to log.',
            'If validation fails, retry once with the validation error appended.'
          ],
          examples: [
            {
              title: 'Pydantic + a retry loop',
              summary: 'The pattern every production LLM app converges on.',
              body: `\`\`\`python
from pydantic import BaseModel, ValidationError

class Reply(BaseModel):
    intent: Literal["refund", "question", "complaint"]
    confidence: float
    short_answer: str

def ask(prompt, attempts=2):
    err = ""
    for _ in range(attempts):
        raw = call_llm(prompt + err)
        try:
            return Reply.model_validate_json(raw)
        except ValidationError as e:
            err = f"\\n\\nYour previous reply failed validation:\\n{e}\\nReturn valid JSON."
    raise RuntimeError("LLM kept producing invalid JSON")
\`\`\`

The model uses the validation error as feedback. Success rate after one retry is typically >99%.`
            }
          ]
        },
        {
          id: 'mcp',
          title: 'Model Context Protocol (MCP)',
          intro:
            'MCP is an open standard for connecting AI agents to tools, data, and services through a common interface. Instead of writing custom integrations per framework, you ship an MCP server once — any MCP-aware client (Claude Desktop, Cursor, your own) can talk to it.',
          keypoints: [
            'Think of MCP as "LSP for AI tools".',
            'Servers expose tools, resources, and prompts.',
            'Clients (agents) discover and call them at runtime.'
          ],
          examples: [
            {
              title: 'A tiny MCP server',
              summary: 'Expose a "list files" tool to any MCP-aware agent.',
              body: `\`\`\`python
from mcp.server.fastmcp import FastMCP
import os

mcp = FastMCP("files")

@mcp.tool()
def list_files(path: str = ".") -> list[str]:
    """List files in the given directory."""
    return os.listdir(path)

if __name__ == "__main__":
    mcp.run()
\`\`\`

Point Claude Desktop / Cursor / your agent at this server and \`list_files\` is now available as a tool. The same server works for any client that speaks MCP. Write once, reuse everywhere.`
            }
          ]
        }
      ]
    },
    {
      id: 'planning-and-state',
      title: 'Chapter 3 · Planning, State & Long Tasks',
      subtitle: 'When one loop isn\'t enough.',
      sections: [
        {
          id: 'planner-executor',
          title: 'Planner + executor split',
          intro:
            'For multi-step tasks, splitting "plan" from "do" produces more reliable results than letting one model freestyle. The planner produces a step list; the executor handles each step.',
          keypoints: [
            'Plan top-down when the task is decomposable in advance.',
            'Plan-then-do gives you a check-point before expensive actions.',
            'Re-plan if execution surfaces information that invalidates the plan.'
          ],
          examples: [
            {
              title: 'Plan-then-execute, sketched',
              summary: 'A two-stage flow that\'s easy to debug.',
              body: `\`\`\`python
plan = llm("Break this task into 3–6 atomic steps:\\n" + user_goal)
steps = parse_steps(plan)              # ["fetch X", "summarise Y", "draft email"]

results = []
for step in steps:
    out = executor_agent(step, context=results)
    results.append(out)

final = llm("Combine these step results into the final deliverable:\\n" + str(results))
\`\`\`

Now you can log the plan, surface it to a human reviewer, and pause between steps for approval if the next action is risky.`
            },
            {
              title: 'When to re-plan',
              summary: 'Plans go stale — let the agent admit it.',
              body: `Add a re-plan check after each step:

> After executing step N, ask: "Given the new information, is the remaining plan still correct? If not, propose a revised plan."

Most agents fail not because they can\'t execute, but because they march through an out-of-date plan. A 50-token re-plan check between steps catches this for almost free.`
            }
          ]
        },
        {
          id: 'memory',
          title: 'Memory: short, long, episodic',
          intro:
            'Memory in agents has three flavours. Pick the right one for the job — stuffing everything into the context window does not scale and is not what humans do either.',
          keypoints: [
            'Short-term: the current conversation buffer.',
            'Long-term: vector store of past summaries or facts.',
            'Episodic: structured records of "what happened" (user X told us Y on date Z).'
          ],
          examples: [
            {
              title: 'Conversation summarisation',
              summary: 'Don\'t hand the model 200 turns — hand it a running summary.',
              body: `\`\`\`python
buffer = []        # last 10 messages, verbatim
summary = ""       # rolling summary of everything before

def step(user_msg):
    buffer.append({"role": "user", "content": user_msg})
    context = f"Summary so far:\\n{summary}\\n\\nRecent messages:\\n{buffer}"
    reply = llm(context)
    buffer.append({"role": "assistant", "content": reply})
    if len(buffer) > 20:
        global summary, buffer
        summary = llm("Summarise this conversation:\\n" + str(buffer[:10]))
        buffer = buffer[10:]
    return reply
\`\`\`

Bounded context, unbounded conversation length. Costs and latency stay flat.`
            }
          ]
        }
      ]
    },
    {
      id: 'eval-safety-multi',
      title: 'Chapter 4 · Evals, Safety, Multi-agent',
      subtitle: 'Ship agents you can trust.',
      sections: [
        {
          id: 'evals',
          title: 'Evals for non-deterministic systems',
          intro:
            'You cannot ship an agent without evals. Outputs vary across runs; bugs are invisible without a structured comparison. The good news: a 30-task eval set, run on every prompt change, catches 90% of regressions.',
          keypoints: [
            'Score at two levels: trajectory (did it take the right steps?) and outcome (was the answer right?).',
            'Use LLM-as-judge for soft scoring; humans for the final 10%.',
            'Run evals in CI so prompt edits get graded before they ship.'
          ],
          examples: [
            {
              title: 'A minimal eval harness',
              summary: 'CI-shaped — easy to extend.',
              body: `\`\`\`python
cases = [
  {"input": "refund order 123", "expected_tools": ["lookup_order", "refund"], "expected_answer_contains": "refunded"},
  {"input": "where is my package?", "expected_tools": ["track_shipment"]},
  # ... 30+ more
]

def run_eval():
    pass_, fail_ = 0, 0
    for c in cases:
        result = agent(c["input"])
        ok = all(t in result["tools_called"] for t in c.get("expected_tools", []))
        if "expected_answer_contains" in c:
            ok = ok and c["expected_answer_contains"].lower() in result["final"].lower()
        pass_ += ok; fail_ += not ok
    print(f"{pass_}/{pass_+fail_} passed")
\`\`\`

Wire that into GitHub Actions. Every PR that changes the system prompt now has a number attached to it.`
            },
            {
              title: 'LLM-as-judge for fuzzy correctness',
              summary: 'When string-match doesn\'t cut it.',
              body: `\`\`\`python
def judge(question, expected, actual):
    prompt = f"""You are an evaluator. Question: {question}
Expected answer: {expected}
Model answer: {actual}
Is the model answer semantically correct? Reply JSON: {{"correct": true|false, "reason": "..."}}"""
    return json.loads(llm(prompt))
\`\`\`

Use a strong model (Claude Opus, GPT-4) as the judge even if the agent is on a smaller model. Sanity-check the judge on 50 human-labelled cases first.`
            }
          ]
        },
        {
          id: 'multi-agent',
          title: 'Multi-agent: when and how',
          intro:
            'Multi-agent systems are the most over-used pattern in agentic AI. They\'re great when subtasks are genuinely independent. They\'re a disaster when used to "decompose" something one agent could have done.',
          keypoints: [
            'Default: one agent + good tools. Reach for multi-agent only when single-agent runs out of context or roles conflict.',
            'Supervisor pattern: one orchestrator delegates to specialists.',
            'Parallel sub-agents are valuable for independent research.'
          ],
          examples: [
            {
              title: 'Supervisor + specialists',
              summary: 'A clean pattern that stays debuggable.',
              body: `\`\`\`text
Supervisor agent
├── Router: which specialist should handle this?
│
├── Researcher (web tools, vector DB)
├── Coder (sandboxed exec, git tools)
└── Writer (no tools, just style)
\`\`\`

The supervisor owns the control flow. Specialists never call each other. This keeps the trace linear and easy to debug.

Anti-pattern: peer-to-peer agents that can hand off to each other arbitrarily. Three steps in, no human alive can tell you what\'s happening.`
            },
            {
              title: 'Parallel research sub-agents',
              summary: 'The one case where multi-agent is unambiguously better.',
              body: `If a user asks "compare Postgres, MySQL, and SQLite for my use case", spawn three sub-agents in parallel — one researches each DB — then a synthesiser writes the final comparison.

- Lower latency than serial.
- Each sub-agent gets a clean context, so it can read deeper.
- The synthesiser only sees structured summaries, not raw pages.

This is the pattern Anthropic\'s research-agent uses. Highly effective for breadth-first work.`
            }
          ]
        }
      ]
    }
  ]
}
