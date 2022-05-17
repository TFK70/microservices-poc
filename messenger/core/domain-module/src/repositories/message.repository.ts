import { Message } from '../aggregates'

export abstract class MessageRepository {
  create(): Message {
    return new Message()
  }

  abstract save(aggregate: Message): Promise<void>

  abstract findById(id: string): Promise<Message | undefined>
}
