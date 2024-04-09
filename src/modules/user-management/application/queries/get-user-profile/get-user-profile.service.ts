import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserProfileQuery } from './get-user-profile.query';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@src/modules/user-management/domain/i-user-repository';
import { UserId } from '@src/modules/user-management/domain/value-object';
import { GetUserProfileResponse } from './get-user-profile-response.dto';

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileService implements IQueryHandler {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserProfileQuery): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.find(new UserId(query.userId));
    return new GetUserProfileResponse({
      email: user.email.value,
      name: user.name.value,
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
    });
  }
}
