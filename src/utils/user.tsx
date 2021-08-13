export interface UserSignInInfo {
  username: string;
  authenticationHash: string;
}

export interface UserSignUpInfo extends UserSignInInfo {
  nickname: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export type User = Omit<UserSignUpInfo, 'authenticationHash'>;