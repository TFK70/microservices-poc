import { CommandHandler }    from '@nestjs/cqrs'
import { ICommandHandler }   from '@nestjs/cqrs'

import { UserRepository }    from '@messenger/domain-module'

import { CreateUserCommand } from '../commands'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const user = this.userRepository.create()

    await user.create(command.id, command.name)

    await this.userRepository.save(user)
  }
}
