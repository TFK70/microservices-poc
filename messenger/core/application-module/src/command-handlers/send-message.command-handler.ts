import { CommandHandler }     from '@nestjs/cqrs'
import { ICommandHandler }    from '@nestjs/cqrs'

import { MessageRepository }  from '@messenger/domain-module'

import { SendMessageCommand } from '../commands'

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler implements ICommandHandler<SendMessageCommand, void> {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(command: SendMessageCommand) {
    const message = this.messageRepository.create()

    await message.send(
      command.messageId,
      command.date,
      command.payload,
      command.senderId,
      command.sessionId
    )

    await this.messageRepository.save(message)
  }
}
