export class GetUserProfileResponse {
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: GetUserProfileResponse) {
    this.email = props.email;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
