import { User } from './user';
import { Email, UserId } from './value-object';

export interface IUserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: UserId): Promise<void>;
  find(userId: UserId): Promise<User>;
  findByEmail(email: Email): Promise<User>;
}
