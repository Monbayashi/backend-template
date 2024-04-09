import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/i-user-repository';
import { User } from '../../domain/user';
import { Email, UserId } from '../../domain/value-object';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  public DB: {
    [id: string]: User;
  } = {};

  async save(user: User) {
    this.DB[user.userId.value] = user;
  }

  async update(user: User) {
    this.DB[user.userId.value] = user;
  }

  async delete(userId: UserId) {
    delete this.DB[userId.value];
  }

  async find(userId: UserId) {
    const user = Object.entries(this.DB).find(([id]) => {
      return userId.value === id.toString();
    });
    return user ? user[1] : null;
  }

  async findByEmail(email: Email): Promise<User> {
    const user = Object.entries(this.DB).find(([, usr]) => {
      return usr.email.value === email.value;
    });
    return user ? user[1] : null;
  }
}
