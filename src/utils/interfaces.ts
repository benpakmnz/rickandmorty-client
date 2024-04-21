import { ReactElement } from "react";

export interface IUserParams {
  email: string;
  name: string;
  isAdmin?: boolean;
  id?: string;
}

export interface IUserAuthParams extends IUserParams {
  password: string;
}

export interface ILocationParams {
  name: string;
  icon?: ReactElement;
  id: number;
  type: string;
  dimension: string;
  residents: string[];
  isExternal?: boolean;
}

export interface IResidentParams {
  image: string;
  gender: string;
  status: string;
  name: string;
  species: string;
  id: number;
}
