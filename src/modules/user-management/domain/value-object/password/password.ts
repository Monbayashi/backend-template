import * as bcrypt from 'bcrypt';

type PasswordValue = string;
export class Password {
  private _type: 'Password';
  protected readonly _value: PasswordValue;

  private static PLAIN_REGEX = /^[a-zA-Z0-9]{8,16}$/;
  private static HASH_REGEX = /^\$2[ayb]\$.{56}$/;

  constructor(value: PasswordValue) {
    this.validate(value);
    this._value = Password.HASH_REGEX.test(value)
      ? value
      : bcrypt.hashSync(value, 10);
  }

  protected validate(value: PasswordValue): void {
    if (!Password.HASH_REGEX.test(value) && !Password.PLAIN_REGEX.test(value)) {
      throw new Error('Passwordのフォーマットが不正です');
    }
  }

  compare(plainPassword: PasswordValue): boolean {
    return bcrypt.compareSync(plainPassword, this._value);
  }

  get value(): PasswordValue {
    return this._value;
  }
}
