import { UserId } from './user-id';

// randomUUID() をモックする
jest.mock('crypto', () => ({
  randomUUID: () => '1'.repeat(36),
}));

describe('UserId', () => {
  // 正常系
  test('有効なフォーマットの場合、正しい変換結果を期待', () => {
    const userId = new UserId('0'.repeat(36));
    expect(userId.value).toBe('0'.repeat(36));
  });

  test('デフォルトIDを設定', () => {
    const userId = new UserId();
    expect(userId.value).toBe('1'.repeat(36));
  });

  test('equals', () => {
    const userId1 = new UserId('1'.repeat(36));
    const userId2 = new UserId('1'.repeat(36));
    const userId3 = new UserId('2'.repeat(36));
    expect(userId1.equals(userId2)).toBeTruthy();
    expect(userId1.equals(userId3)).toBeFalsy();
  });

  // 異常系
  test('不正なフォーマットの場合、エラーを投げる', () => {
    expect(() => new UserId('0')).toThrow(
      new Error('UserIdの文字数が不正です'),
    );
  });
});
