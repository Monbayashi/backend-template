import { IUserRepository } from '../../i-user-repository';
import { Email } from '../../value-object';

export class EmailDuplicationCheckDomainService {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: Email): Promise<boolean> {
    const duplicateEmail = await this.userRepository.findByEmail(email);
    const isDuplicateEmail = duplicateEmail !== null;
    return isDuplicateEmail;
  }
}
