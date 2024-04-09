import { MockTransactionManager } from '@src/libs/transaction-manager/mock-transaction-manager.service';
import { InMemoryUserRepository } from '@src/modules/user-management/infrastructure/database/InMemoryUserRepository';
import {
  Email,
  Name,
  Password,
} from '@src/modules/user-management/domain/value-object';
import { JwtService } from '@nestjs/jwt';
import { LoginUserService } from './login-user.service';
import { LoginUserCommand } from './login-user.command';
import { User } from '@src/modules/user-management/domain/user';

describe('LoginUserService', () => {
  // テストデータ作成
  const password = new Password('password');
  const email = new Email('test@gmail.com');
  const name = new Name('test data');

  it('ユーザを登録することができる', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const jwtService = new JwtService({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    });
    const loginUserService = new LoginUserService(
      repository,
      transactionManager,
      jwtService,
    );
    // テストデータ作成
    const user = User.create(password, email, name);
    repository.save(user);
    // コマンド作成
    const command: Required<LoginUserCommand> = new LoginUserCommand({
      password: 'password',
      email: 'test@gmail.com',
    });
    const result = await loginUserService.execute(command);
    // データ確認
    const decodeToken = jwtService.decode(result.access_token);
    expect(decodeToken['email']).toBe('test@gmail.com');
    expect(decodeToken['id']).not.toBeUndefined();
  });

  it('ユーザが見つかりません', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const jwtService = new JwtService({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    });
    const loginUserService = new LoginUserService(
      repository,
      transactionManager,
      jwtService,
    );
    // テストデータ作成
    const user = User.create(password, email, name);
    repository.save(user);
    // コマンド作成
    const command: Required<LoginUserCommand> = new LoginUserCommand({
      password: 'password',
      email: 'test1@gmail.com',
    });
    expect(async () => {
      await loginUserService.execute(command);
    }).rejects.toThrow(new Error('ユーザが見つかりません'));
  });

  it('パスワードが不正です', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const jwtService = new JwtService({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    });
    const loginUserService = new LoginUserService(
      repository,
      transactionManager,
      jwtService,
    );
    // テストデータ作成
    const user = User.create(password, email, name);
    repository.save(user);
    // コマンド作成
    const command: Required<LoginUserCommand> = new LoginUserCommand({
      password: 'password1',
      email: 'test@gmail.com',
    });
    expect(async () => {
      await loginUserService.execute(command);
    }).rejects.toThrow(new Error('パスワードが不正です'));
  });
});
