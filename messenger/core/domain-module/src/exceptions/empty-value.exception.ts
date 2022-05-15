/* eslint-disable max-classes-per-file */
import { AssertionError } from 'assert'

export class IdEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'id'` })
  }
}

export class DateEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'date'` })
  }
}

export class PayloadEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'payload'` })
  }
}

export class SenderIdEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'senderId'` })
  }
}

export class SessionIdEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'sessionId'` })
  }
}

export class NameEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'name'` })
  }
}

export class UserIdEmptyValueException extends AssertionError {
  constructor(options: { message?: string | undefined } = {}) {
    super({ ...options, message: options.message || `Required field 'userId'` })
  }
}
