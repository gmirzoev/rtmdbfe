export interface IAuthDispatchProps {
  login(uLogin: string): void;
}

export type IAuthProps = IAuthDispatchProps

export interface IAuthState {
  users: {
    name: string
    login: string;
    role: string;
  }[];
}
