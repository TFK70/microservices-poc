export class MessageSent {
  constructor(
    public readonly id: string,
    public readonly date: string,
    public readonly payload: string,
    public readonly senderId: string,
    public readonly sessionId: string
  ) {}
}
