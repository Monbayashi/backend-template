import { MockTransactionManager } from '@src/libs/transaction-manager/mock-transaction-manager.service';
import { InMemoryUserRepository } from '@src/modules/user-management/infrastructure/database/InMemoryUserRepository';
import {
  Email,
  Name,
  Password,
} from '@src/modules/user-management/domain/value-object';
import { DeleteUserService } from './delete-user.server';
import { User } from '@src/modules/user-management/domain/user';
import { DeleteUserCommand } from './delete-user.command';

describe('DeleteUserService', () => {
  // テストデータ作成
  const password = new Password('password');
  const email = new Email('test@gmail.com');
  const name = new Name('test data');

  it('ユーザを登録することができる', async () => {
    const repository = new InMemoryUserRepository();
    const transactionManager = new MockTransactionManager();
    const deleteUserService = new DeleteUserService(
      repository,
      transactionManager,
    );
    // テストデータ作成
    const user = User.create(password, email, name);
    repository.save(user);
    // コマンド作成
    const command: Required<DeleteUserCommand> = new DeleteUserCommand({
      userId: user.userId.value,
    });
    await deleteUserService.execute(command);
    // データ確認
    const deletedUser = await repository.find(user.userId);
    expect(deletedUser).toBeNull();
  });

  // it('ユーザが見つかりません', async () => {
  //   const repository = new InMemoryUserRepository();
  //   const transactionManager = new MockTransactionManager();
  //   const deleteUserService = new DeleteUserService(
  //     repository,
  //     transactionManager,
  //   );
  //   // テストデータ作成
  //   const user = User.create(password, email, name);
  //   repository.save(user);
  //   // コマンド作成
  //   const command: Required<DeleteUserCommand> = new DeleteUserCommand({
  //     userId: user.userId.value + 'a',
  //   });
  //   await deleteUserService.execute(command);
  // });
});
