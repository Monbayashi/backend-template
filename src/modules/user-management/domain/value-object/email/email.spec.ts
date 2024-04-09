import { Email } from './email';

describe('Email', () => {
  // 正常系
  test('有効なフォーマットの場合、正しい変換結果を期待', () => {
    const email = new Email('test@gmail.com');
    expect(email.value).toBe('test@gmail.com');
  });

  test('equals', () => {
    const email1 = new Email('test01@gmail.com');
    const email2 = new Email('test01@gmail.com');
    const email3 = new Email('test02@gmail.com');
    expect(email1.equals(email2)).toBeTruthy();
    expect(email1.equals(email3)).toBeFalsy();
  });

  // 異常系
  test('不正なフォーマットの場合、エラーを投げる', () => {
    expect(() => new Email('test')).toThrow(
      new Error('Emailのフォーマットが不正です'),
    );
    expect(() => new Email('test.@gmail.com')).toThrow(
      new Error('Emailのフォーマットが不正です'),
    );
  });
});
