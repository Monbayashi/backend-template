import { Module, Provider } from '@nestjs/common';
import { PrismaTransactionManager } from '@src/libs/transaction-manager/prisma-transaction-manager.service';
import { PrismaUserRepository } from './infrastructure/database/PrismaUserRepository';
import { CreateUserHttpController } from './application/commands/create-user/create-user-http.controller';
import { loginUserHttpController } from './application/commands/login-user/login-user-http.controller';
import { DeleteUserHttpController } from './application/commands/delete-user/delete-user-http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserService } from './application/commands/create-user/create-user.service';
import { LoginUserService } from './application/commands/login-user/login-user.service';
import { DeleteUserService } from './application/commands/delete-user/delete-user.server';
import { GetUserProfileHttpController } from './application/queries/get-user-profile/get-user-profile-http.controller';
import { GetUserProfileService } from './application/queries/get-user-profile/get-user-profile.service';

const httpController = [
  CreateUserHttpController,
  loginUserHttpController,
  GetUserProfileHttpController,
  DeleteUserHttpController,
];

const eventHandler: Provider[] = [];

const repositorys: Provider[] = [
  { provide: 'TRANSACTION_MANAGER', useClass: PrismaTransactionManager },
  { provide: 'USER_REPOSITORY', useClass: PrismaUserRepository },
];

const applicationServices: Provider[] = [
  CreateUserService,
  LoginUserService,
  GetUserProfileService,
  DeleteUserService,
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpController],
  providers: [...eventHandler, ...applicationServices, ...repositorys],
})
export class UserManagementModule {}
