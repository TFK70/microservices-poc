export class SessionBinding {
  #id!: string

  #userId!: string

  #sessionId!: string

  constructor(id: string, userId: string, sessionId: string) {
    this.#id = id
    this.#userId = userId
    this.#sessionId = sessionId
  }

  get id() {
    return this.#id
  }

  get userId() {
    return this.#userId
  }

  get sessionId() {
    return this.#sessionId
  }

  get properties() {
    return {
      id: this.#id,
      userId: this.#userId,
      sessionId: this.#sessionId,
    }
  }
}
