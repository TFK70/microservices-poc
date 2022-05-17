import { AggregateRoot }         from '@nestjs/cqrs'

import assert                    from 'assert'

import { TimerCreated }          from '../events'
import { TimerStarted }          from '../events'
import { TimerStopped }          from '../events'
import { TimerIncremented }      from '../events'
import { IdEmptyValueException } from '../exceptions'

export interface TimerProperties {
  id: string
  code: string
  time: number
  isRunning: boolean
}

export class Timer extends AggregateRoot {
  #id!: string

  #code!: string

  #time: number = 0

  #isRunning: boolean = false

  constructor(properties?: TimerProperties) {
    super()

    if (properties) {
      this.#id = properties.id
      this.#code = properties.code
      this.#time = properties.time
      this.#isRunning = properties.isRunning
    }
  }

  get id() {
    return this.#id
  }

  get code() {
    return this.#code
  }

  get time() {
    return this.#time
  }

  get isRunning() {
    return this.#isRunning
  }

  get properties() {
    return {
      id: this.#id,
      code: this.#code,
      time: this.#time,
      isRunning: this.#isRunning,
    }
  }

  async create(id: string, code: string) {
    assert.ok(id, new IdEmptyValueException())

    this.apply(new TimerCreated(id, code))

    return this
  }

  onTimerCreated(event: TimerCreated) {
    this.#id = event.id
    this.#code = event.code
  }

  async start() {
    this.apply(new TimerStarted())

    return this
  }

  onTimerStarted(event: TimerStarted) {
    this.#isRunning = true
  }

  async stop() {
    this.apply(new TimerStopped())

    return this
  }

  onTimerStopped(event: TimerStopped) {
    this.#isRunning = false
  }

  async increment() {
    this.apply(new TimerIncremented())

    return this
  }

  onTimerIncremented(event: TimerIncremented) {
    this.#time += 1
  }
}
