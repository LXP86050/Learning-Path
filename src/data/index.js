import { ai } from './paths/ai.js'
import { agentic } from './paths/agentic.js'
import { fullstack } from './paths/fullstack.js'
import { programs } from './programs.js'
import { interviewPrep } from './interview.js'
import { tasks } from './tasks.js'

function attachTasks(path) {
  const pathTasks = tasks[path.id] || {}
  return {
    ...path,
    chapters: path.chapters.map(ch => ({
      ...ch,
      sections: ch.sections.map(sec => ({
        ...sec,
        tasks: pathTasks[sec.id] || []
      }))
    }))
  }
}

export const paths = {
  ai: attachTasks(ai),
  agentic: attachTasks(agentic),
  fullstack: attachTasks(fullstack)
}

export { programs, interviewPrep }
