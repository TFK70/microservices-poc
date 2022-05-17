import { AssertionError } from 'assert'

export class IdEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'id'` })
  }
}
