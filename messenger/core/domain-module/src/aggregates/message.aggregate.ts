import { AggregateRoot }                from '@nestjs/cqrs'

import assert                           from 'assert'

import { MessageSent }                  from '../events'
import { IdEmptyValueException }        from '../exceptions'
import { DateEmptyValueException }      from '../exceptions'
import { PayloadEmptyValueException }   from '../exceptions'
import { SenderIdEmptyValueException }  from '../exceptions'
import { SessionIdEmptyValueException } from '../exceptions'

export interface MessageProperties {
  id: string
  date: string
  payload: string
  senderId: string
  sessionId: string
}

export class Message extends AggregateRoot {
  #id!: string

  #date!: string

  #payload!: string

  #senderId!: string

  #sessionId!: string

  constructor(properties?: MessageProperties) {
    super()

    if (properties) {
      this.#id = properties.id
      this.#date = properties.date
      this.#payload = properties.payload
      this.#senderId = properties.senderId
      this.#sessionId = properties.sessionId
    }
  }

  get id() {
    return this.#id
  }

  get date() {
    return this.#date
  }

  get payload() {
    return this.#payload
  }

  get senderId() {
    return this.#senderId
  }

  get sessionId() {
    return this.#sessionId
  }

  get properties() {
    return {
      id: this.#id,
      date: this.#date,
      payload: this.#payload,
      senderId: this.#senderId,
      sessionId: this.#sessionId,
    }
  }

  async send(id: string, date: string, payload: string, senderId: string, sessionId: string) {
    assert.ok(id, new IdEmptyValueException())
    assert.ok(date, new DateEmptyValueException())
    assert.ok(payload, new PayloadEmptyValueException())
    assert.ok(senderId, new SenderIdEmptyValueException())
    assert.ok(sessionId, new SessionIdEmptyValueException())

    this.apply(new MessageSent(id, date, payload, senderId, sessionId))

    return this
  }

  onMessageSent(event: MessageSent) {
    this.#id = event.id
    this.#date = event.date
    this.#payload = event.payload
    this.#senderId = event.senderId
    this.#sessionId = event.sessionId
  }
}
