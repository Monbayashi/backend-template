import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@src/configs/app.routes';
import { LoginUserRequstDto } from './login-user-request.dto';
import { LoginUserCommand } from './login-user.command';
import { Public } from '@src/common/guard/public.decorator';

@Public()
@Controller(routesV1.version)
export class loginUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.userManagement.login)
  async login(@Body() body: LoginUserRequstDto) {
    console.log(body);
    const command = new LoginUserCommand({ ...body });
    return await this.commandBus.execute(command);
  }
}
