export default class User {
  userid?: string = '';
  firstname?: string = '';
  lastname?: string = '';
  email: string = '';
  password: string = '';

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
