import { Password } from './password';

describe('Password', () => {
  // 正常系
  test('有効なフォーマットの場合、正しい変換結果を期待', () => {
    const password = new Password('password');
    expect(password.value).toHaveLength(60);
  });

  test('compare', () => {
    const plain = 'password';
    const password = new Password(plain);
    expect(password.compare(plain)).toBeTruthy();
    expect(password.compare('errorPass')).toBeFalsy();
  });

  // 以上系
  test('無効なフォーマット', () => {
    const passwordChar7 = '1234567';
    const passwordChar17 = '12345678901234567';
    const passwordCharErr = 'エラー文字です12345678';
    expect(() => new Password(passwordChar7)).toThrow(
      new Error('Passwordのフォーマットが不正です'),
    );
    expect(() => new Password(passwordChar17)).toThrow(
      new Error('Passwordのフォーマットが不正です'),
    );
    expect(() => new Password(passwordCharErr)).toThrow(
      new Error('Passwordのフォーマットが不正です'),
    );
  });
});
