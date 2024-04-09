import { Controller, Get, Request } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { routesV1 } from '@src/configs/app.routes';
import { GetUserProfileQuery } from './get-user-profile.query';

@Controller(routesV1.version)
export class GetUserProfileHttpController {
  constructor(private queryBus: QueryBus) {}

  @Get(routesV1.userManagement.get)
  async getUserProfile(@Request() req) {
    const query = new GetUserProfileQuery({ userId: req['user'].id });
    return await this.queryBus.execute(query);
  }
}
