export interface IUserParams {
  email: string;
  name: string;
  isAdmin?: boolean;
  id?: string;
  // user_pic: string;
}

export interface IUserAuthParams extends IUserParams {
  password: string;
}
