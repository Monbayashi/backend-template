import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@src/configs/app.routes';
import { CreateUserRequstDto } from './create-user-request.dto';
import { CreateUserCommand } from './create-user.command';
import { Public } from '@src/common/guard/public.decorator';

@Public()
@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.userManagement.post)
  async createUser(@Body() body: CreateUserRequstDto): Promise<void> {
    const command = new CreateUserCommand({ ...body });
    return await this.commandBus.execute(command);
  }
}
