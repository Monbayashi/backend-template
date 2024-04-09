import { Name } from './name';

describe('Name', () => {
  // 正常系
  test('有効なフォーマットの場合、正しい変換結果を期待', () => {
    const name = new Name('山田太郎');
    expect(name.value).toBe('山田太郎');
  });

  test('equals', () => {
    const name1 = new Name('山田太郎A');
    const name2 = new Name('山田太郎A');
    const name3 = new Name('山田太郎B');
    expect(name1.equals(name2)).toBeTruthy();
    expect(name1.equals(name3)).toBeFalsy();
  });

  // 異常系
  test('不正なフォーマットの場合、エラーを投げる', () => {
    expect(() => new Name('12345678901234567')).toThrow(
      new Error('Nameの文字数が不正です'),
    );
    expect(() => new Name('1')).toThrow(new Error('Nameの文字数が不正です'));
  });
});
