export class LoginUserCommand {
  readonly password: string;
  readonly email: string;
  constructor(props: LoginUserCommand) {
    this.password = props.password;
    this.email = props.email;
  }
}
