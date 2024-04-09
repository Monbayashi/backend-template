import { CreatedAt } from '@src/common/ddd/value-object/created-at';
import { User } from './user';
import { Email, Name, Password, UserId } from './value-object';
import { UpdatedAt } from '@src/common/ddd/value-object/updated-at';

// randomUUID() をモックする
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: () => '0'.repeat(36),
}));

describe('User', () => {
  const email = new Email('test@gmail.com');
  const name = new Name('山田太郎');
  const plainPassword = 'password';
  const password = new Password(plainPassword);
  const createDate = new Date('2023-03-16 12:12:12');
  const updateDate = new Date('2023-03-16 02:02:02');
  const createdAt = new CreatedAt(createDate);
  const updatedAt = new UpdatedAt(updateDate);

  describe('create', () => {
    it('ユーザを作成する', () => {
      const user = User.create(password, email, name);
      expect(user.userId.value).toBe('0'.repeat(36));
      expect(user.password.compare(plainPassword)).toBeTruthy();
      expect(user.email.equals(email)).toBeTruthy();
      expect(user.name.equals(name)).toBeTruthy();
      expect(user.updatedAt.value instanceof Date).toBeTruthy();
      expect(user.updatedAt.value instanceof Date).toBeTruthy();
    });
  });

  describe('reconstruct', () => {
    const userId = new UserId('1'.repeat(36));
    it('再構築する', () => {
      const user = User.reconstruct(
        userId,
        password,
        email,
        name,
        createdAt,
        updatedAt,
      );
      expect(user.userId.equals(userId)).toBeTruthy();
      expect(user.password.compare(plainPassword)).toBeTruthy();
      expect(user.email.equals(email)).toBeTruthy();
      expect(user.name.equals(name)).toBeTruthy();
    });
  });
});
