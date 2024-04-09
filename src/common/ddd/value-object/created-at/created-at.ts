import { ValueObject } from '@src/libs/domain/value-object';

type CreatedAtValue = Date;
export class CreatedAt extends ValueObject<CreatedAtValue, 'CreatedAt'> {
  constructor(value: CreatedAtValue = new Date()) {
    super(value);
  }

  protected validate(value: CreatedAtValue): void {
    if (!(value instanceof Date)) {
      throw new Error('CreatedAtのフォーマットが不正です');
    }
  }

  toString(): string {
    const yyyy = String(this._value.getFullYear());
    const MM = String(this._value.getMonth() + 1).padStart(2, '0');
    const dd = String(this._value.getDate()).padStart(2, '0');
    const hh = String(this._value.getHours()).padStart(2, '0');
    const mm = String(this._value.getMinutes()).padStart(2, '0');
    const ss = String(this._value.getSeconds()).padStart(2, '0');
    return `${yyyy}-${MM}-${dd} ${hh}-${mm}-${ss}`;
  }
}
