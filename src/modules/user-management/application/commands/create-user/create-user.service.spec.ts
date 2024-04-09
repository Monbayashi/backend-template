import { MockTransactionManager } from '@src/libs/transaction-manager/mock-transaction-manager.service';
import { InMemoryUserRepository } from '@src/modules/user-management/infrastructure/database/InMemoryUserRepository';
import { CreateUserService } from './create-user.service';
import { UserId } from '@src/modules/user-management/domain/value-object';
import { CreateUserCommand } from './create-user.command';

describe('CreateUserService', () => {
  // テストデータ作成
  const password = 'password';
  const email = 'test@gmail.com';
  const name = 'test data';

  it('ユーザを登録することができる', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const createUserService = new CreateUserService(
      repository,
      transactionManager,
    );
    // コマンド作成
    const command: Required<CreateUserCommand> = new CreateUserCommand({
      password,
      email,
      name,
    });
    const id = await createUserService.execute(command);
    // データ確認
    const user = await repository.find(new UserId(id));
    expect(user.name.value).toBe(name);
    expect(user.email.value).toBe(email);
    expect(user.password.compare(password)).toBeTruthy();
  });

  it('Emailが重複した場合エラーが出力される', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const createUserService = new CreateUserService(
      repository,
      transactionManager,
    );
    // コマンド作成
    const command: Required<CreateUserCommand> = new CreateUserCommand({
      password,
      email,
      name,
    });
    await createUserService.execute(command);
    // 再度登録する
    expect(async () => {
      await createUserService.execute(command);
    }).rejects.toThrow(new Error('既に存在するEmailです'));
  });
});
