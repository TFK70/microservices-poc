import { AggregateRoot }             from '@nestjs/cqrs'

import assert                        from 'assert'

import { SessionCreated }            from '../events'
import { UserJoined }                from '../events'
import { IdEmptyValueException }     from '../exceptions'
import { NameEmptyValueException }   from '../exceptions'
import { UserIdEmptyValueException } from '../exceptions'
import { SessionBinding }            from '../value-objects'

export interface SessionProperties {
  id: string
  name: string
  bindings: Array<SessionBinding>
}

export class Session extends AggregateRoot {
  #id!: string

  #name!: string

  #bindings: Array<SessionBinding> = []

  constructor(properties?: SessionProperties) {
    super()

    if (properties) {
      this.#id = properties.id
      this.#name = properties.name
      this.#bindings = properties.bindings || []
    }
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get bindings() {
    return this.#bindings
  }

  get properties() {
    return {
      id: this.#id,
      name: this.#name,
      userIds: this.#bindings,
    }
  }

  async create(id: string, name: string) {
    assert.ok(id, new IdEmptyValueException())
    assert.ok(name, new NameEmptyValueException())

    this.apply(new SessionCreated(id, name))

    return this
  }

  onSessionCreated(event: SessionCreated) {
    this.#id = event.id
    this.#name = event.name
  }

  async joinUser(bindingId: string, userId: string) {
    assert.ok(userId, new UserIdEmptyValueException())

    this.apply(new UserJoined(bindingId, userId))

    return this
  }

  onUserJoined(event: UserJoined) {
    this.#bindings.push(new SessionBinding(event.bindingId, event.userId, this.#id))
  }
}
