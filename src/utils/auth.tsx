import ServerInfo from "./server-info";
import { User, UserSignInInfo, UserSignUpInfo } from "./user";

export async function fetchUser() {
  let response = await fetch(
    `${ServerInfo.SERVER_BASE_URL}/user/fetch`,
    { credentials: 'include' }
  );
  let user: User | undefined;
  if (response.ok) {
    user = await response.json() as User;
    // TODO maybe fetch roles
  }
  return user;
}

export async function signIn(userInfo: UserSignInInfo) {
  const response = await fetch(
    `${ServerInfo.SERVER_BASE_URL}/authentication/sign-in`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }
  );
  return response.ok;
}

export async function signUp(userInfo: UserSignUpInfo) {
  const response = await fetch(
    `${ServerInfo.SERVER_BASE_URL}/authentication/sign-up`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }
  );
  return response.ok;
}

export async function signOut() {
  await fetch(
    `${ServerInfo.SERVER_BASE_URL}/authentication/sign-out`,
    {
      method: 'POST',
      credentials: 'include'
    }
  );
  window.location.reload();
}