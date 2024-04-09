import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@src/modules/user-management/domain/i-user-repository';
import { ITransactionManager } from '@src/libs/application/i-transaction-manager';
import { User } from '@src/modules/user-management/domain/user';
import {
  Email,
  Name,
  Password,
} from '@src/modules/user-management/domain/value-object';
import { EmailDuplicationCheckDomainService } from '@src/modules/user-management/domain/services/email-duplication-check/email-duplication-check.domain-service';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository,
    @Inject('TRANSACTION_MANAGER')
    private transactionManager: ITransactionManager,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    return await this.transactionManager.begin(async () => {
      const isDuplicateEmail = await new EmailDuplicationCheckDomainService(
        this.userRepository,
      ).execute(new Email(command.email));
      if (isDuplicateEmail) {
        throw new Error('既に存在するEmailです');
      }
      const user = User.create(
        new Password(command.password),
        new Email(command.email),
        new Name(command.name),
      );
      await this.userRepository.save(user);
      return user.userId.value;
    });
  }
}
