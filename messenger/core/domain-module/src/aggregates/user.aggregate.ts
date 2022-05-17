import { AggregateRoot }           from '@nestjs/cqrs'

import assert                      from 'assert'

import { UserCreated }             from '../events'
import { IdEmptyValueException }   from '../exceptions'
import { NameEmptyValueException } from '../exceptions'

export interface UserProperties {
  id: string
  name: string
}

export class User extends AggregateRoot {
  #id!: string

  #name!: string

  constructor(properties?: UserProperties) {
    super()

    if (properties) {
      this.#id = properties.id
      this.#name = properties.name
    }
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get properties() {
    return {
      id: this.#id,
      name: this.#name,
    }
  }

  async create(id: string, name: string) {
    assert.ok(id, new IdEmptyValueException())
    assert.ok(name, new NameEmptyValueException())

    this.apply(new UserCreated(id, name))

    return this
  }

  onUserCreated(event: UserCreated) {
    this.#id = event.id
    this.#name = event.name
  }
}
