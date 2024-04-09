import { Controller, Delete, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@src/configs/app.routes';
import { DeleteUserCommand } from './delete-user.command';

@Controller(routesV1.version)
export class DeleteUserHttpController {
  constructor(private commandBus: CommandBus) {}

  @Delete(routesV1.userManagement.delete)
  async deleteUser(@Request() req) {
    const command = new DeleteUserCommand({ userId: req['user'].id });
    return await this.commandBus.execute(command);
  }
}
