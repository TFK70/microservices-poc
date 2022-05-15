export class SendMessageCommand {
  constructor(
    public readonly messageId: string,
    public readonly date: string,
    public readonly senderId: string,
    public readonly sessionId: string,
    public readonly payload: string
  ) {}
}
