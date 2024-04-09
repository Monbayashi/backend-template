export class CreateUserCommand {
  readonly password: string;
  readonly email: string;
  readonly name: string;
  constructor(props: CreateUserCommand) {
    this.password = props.password;
    this.email = props.email;
    this.name = props.name;
  }
}
