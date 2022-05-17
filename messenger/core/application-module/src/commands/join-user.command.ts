export class JoinUserCommand {
  constructor(public readonly userId: string, public readonly sessionId: string) {}
}
