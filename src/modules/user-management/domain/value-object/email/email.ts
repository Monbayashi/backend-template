import { ValueObject } from '@src/libs/domain/value-object';
import { isEmail } from 'class-validator';

type EmailValue = string;
export class Email extends ValueObject<EmailValue, 'Name'> {
  constructor(value: EmailValue) {
    super(value);
  }

  protected validate(value: EmailValue): void {
    if (!isEmail(value)) {
      throw new Error('Emailのフォーマットが不正です');
    }
  }
}
