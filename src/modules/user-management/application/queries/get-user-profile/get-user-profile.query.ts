export class GetUserProfileQuery {
  readonly userId: string;
  constructor(props: GetUserProfileQuery) {
    this.userId = props.userId;
  }
}
