import { AssertionError } from 'assert'

export class TimerNotFoundException extends AssertionError {
  constructor(id: string, options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Timer with id ${id} not found` })
  }
}
