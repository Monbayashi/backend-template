import { ValueObject } from '@src/libs/domain/value-object';

type NameValue = string;
export class Name extends ValueObject<NameValue, 'Name'> {
  static MAX_LENGTH = 16;
  static MIN_LENGTH = 2;

  constructor(value: NameValue) {
    super(value);
  }

  protected validate(value: NameValue): void {
    if (value.length > Name.MAX_LENGTH || value.length < Name.MIN_LENGTH) {
      throw new Error('Nameの文字数が不正です');
    }
  }
}
