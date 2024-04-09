import { ValueObject } from '@src/libs/domain/value-object';
import { randomUUID } from 'crypto';

type UserIdValue = string;
export class UserId extends ValueObject<UserIdValue, 'UserId'> {
  static LENGTH = 36;

  constructor(value: UserIdValue = randomUUID()) {
    super(value);
  }

  protected validate(value: UserIdValue): void {
    if (value.length !== UserId.LENGTH) {
      throw new Error('UserIdの文字数が不正です');
    }
  }
}
