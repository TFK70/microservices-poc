/* eslint-disable max-classes-per-file */

import { AssertionError } from 'assert'

export class SessionNotFoundException extends AssertionError {
  constructor(id: string, options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Session with id ${id} not found` })
  }
}

export class UserNotFoundException extends AssertionError {
  constructor(id: string, options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `User with id ${id} not found` })
  }
}
