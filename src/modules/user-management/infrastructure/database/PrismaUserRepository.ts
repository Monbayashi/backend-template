import { PrismaClientManagerService } from '@src/libs/prisma-client-manager/prisma-client-manager.service';
import { IUserRepository } from '../../domain/i-user-repository';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { Email, Name, Password, UserId } from '../../domain/value-object';
import { CreatedAt } from '@src/common/ddd/value-object/created-at';
import { UpdatedAt } from '@src/common/ddd/value-object/updated-at';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private clientManager: PrismaClientManagerService) {}

  async save(user: User) {
    const client = this.clientManager.getClient();
    await client.user.create({
      data: {
        id: user.userId.value,
        password: user.password.value,
        email: user.email.value,
        name: user.name.value,
        createdAt: user.createdAt.value,
        updatedAt: user.updatedAt.value,
      },
    });
  }

  async update(user: User) {
    const client = this.clientManager.getClient();
    await client.user.update({
      where: {
        id: user.userId.value,
      },
      data: {
        password: user.password.value,
        email: user.email.value,
        name: user.name.value,
        createdAt: user.createdAt.value,
        updatedAt: user.updatedAt.value,
      },
    });
  }

  async delete(userId: UserId) {
    const client = this.clientManager.getClient();
    await client.user.delete({
      where: {
        id: userId.value,
      },
    });
  }

  async find(userId: UserId) {
    const client = this.clientManager.getClient();
    const data = await client.user.findUnique({
      where: {
        id: userId.value,
      },
    });

    if (!data) {
      return null;
    }

    return User.reconstruct(
      new UserId(data.id),
      new Password(data.password),
      new Email(data.email),
      new Name(data.name),
      new CreatedAt(data.createdAt),
      new UpdatedAt(data.updatedAt),
    );
  }

  async findByEmail(email: Email): Promise<User> {
    const client = this.clientManager.getClient();
    const data = await client.user.findUnique({
      where: {
        email: email.value,
      },
    });

    if (!data) {
      return null;
    }

    return User.reconstruct(
      new UserId(data.id),
      new Password(data.password),
      new Email(data.email),
      new Name(data.name),
      new CreatedAt(data.createdAt),
      new UpdatedAt(data.updatedAt),
    );
  }
}
