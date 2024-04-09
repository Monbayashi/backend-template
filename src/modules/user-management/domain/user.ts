import { CreatedAt } from '@src/common/ddd/value-object/created-at';
import { Email, Name, UserId, Password } from './value-object';
import { UpdatedAt } from '@src/common/ddd/value-object/updated-at';

export class User {
  private constructor(
    private readonly _userId: UserId,
    private _password: Password,
    private _email: Email,
    private _name: Name,
    private _createdAt: CreatedAt,
    private _updatedAt: UpdatedAt,
  ) {}

  static create(password: Password, email: Email, name: Name) {
    const userId = new UserId();
    const createdAt = new CreatedAt();
    const updatedAt = new UpdatedAt();
    const user = new User(userId, password, email, name, createdAt, updatedAt);
    return user;
  }

  static reconstruct(
    userId: UserId,
    password: Password,
    email: Email,
    name: Name,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    const user = new User(userId, password, email, name, createdAt, updatedAt);
    return user;
  }

  delete() {
    // 削除可能か確認する
    // Userを削除する処理を記載する
  }

  changeEmail(email: Email) {
    this._email = email;
    this._updatedAt = new UpdatedAt();
  }

  changeName(name: Name) {
    this._name = name;
    this._updatedAt = new UpdatedAt();
  }

  changePassword(password: Password) {
    this._password = password;
    this._updatedAt = new UpdatedAt();
  }

  get userId(): UserId {
    return this._userId;
  }

  get email(): Email {
    return this._email;
  }

  get name(): Name {
    return this._name;
  }

  get password(): Password {
    return this._password;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }
}
