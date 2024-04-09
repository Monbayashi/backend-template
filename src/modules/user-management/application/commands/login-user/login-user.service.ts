import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@src/modules/user-management/domain/i-user-repository';
import { ITransactionManager } from '@src/libs/application/i-transaction-manager';
import { Email } from '@src/modules/user-management/domain/value-object';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserService implements ICommandHandler {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository,
    @Inject('TRANSACTION_MANAGER')
    private transactionManager: ITransactionManager,
    private jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<{ access_token: string }> {
    return await this.transactionManager.begin(async () => {
      const user = await this.userRepository.findByEmail(
        new Email(command.email),
      );
      if (!user) {
        throw new Error('ユーザが見つかりません');
      }
      if (!user.password.compare(command.password)) {
        throw new Error('パスワードが不正です');
      }
      const payload = { email: user.email.value, id: user.userId.value };
      return { access_token: this.jwtService.sign(payload) };
    });
  }
}
