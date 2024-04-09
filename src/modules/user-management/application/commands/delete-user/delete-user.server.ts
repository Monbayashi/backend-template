import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITransactionManager } from '@src/libs/application/i-transaction-manager';
import { IUserRepository } from '@src/modules/user-management/domain/i-user-repository';
import { DeleteUserCommand } from './delete-user.command';
import { UserId } from '@src/modules/user-management/domain/value-object';

@CommandHandler(DeleteUserCommand)
export class DeleteUserService implements ICommandHandler {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository,
    @Inject('TRANSACTION_MANAGER')
    private transactionManager: ITransactionManager,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    return await this.transactionManager.begin(async () => {
      const user = await this.userRepository.find(new UserId(command.userId));
      if (!user) {
        throw new Error('ユーザが見つかりません');
      }
      user.delete();
      await this.userRepository.delete(user.userId);
    });
  }
}
