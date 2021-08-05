import { TextFieldTypes } from "@ionic/core";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, useIonAlert, AlertButton, AlertOptions } from "@ionic/react";
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";
import { useState } from "react";
import { signIn as authSignIn, signUp as authSignUp } from "../utils/auth";
import { UserSignInInfo, UserSignUpInfo } from "../utils/user";

import styles from './UserSignInOrUp.module.css';

export enum UserSignMode {
  In,
  Up
}

const signInInputDefinitions = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true
  },
];

const signUpInputDefinitions = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true
  },
];

const UserSignInOrUp: React.FC<{ signMode: UserSignMode }> = ({ signMode }) => {
  const [userInfo, setUserInfo] = useState<Partial<UserSignInInfo | UserSignUpInfo>>({});
  const [presentAlert] = useIonAlert();

  const inputDefinitions = signMode === UserSignMode.In ? signInInputDefinitions : signUpInputDefinitions;

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard className={styles['input-card']}>
          <IonCardHeader>
            <IonCardTitle>{signMode === UserSignMode.In ? 'Sign into your account' : 'Create your account'}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={async event => {
              event.preventDefault();
              signMode === UserSignMode.In ? signIn(userInfo, presentAlert, setUserInfo) : signUp(userInfo, presentAlert, setUserInfo);
            }}>
              {
                inputDefinitions.map(inputDefinition => (
                  <IonItem key={inputDefinition.name}>
                    <IonLabel position="floating">{inputDefinition.label}</IonLabel>
                    <IonInput
                      type={inputDefinition.type as TextFieldTypes}
                      required={inputDefinition.required}
                      onIonChange={
                        async ({ detail }) => inputDefinition.name === 'password' ?
                          userInfo.authenticationHash = await digestText(detail.value?.toString()) :
                          (userInfo as any)[inputDefinition.name] = detail.value
                      }
                    ></IonInput>
                  </IonItem>
                ))
              }
              <IonButton
                type="submit"
                expand="block"
              >{signMode === UserSignMode.In ? 'Sign In' : 'Sign Up'}</IonButton>
              <IonButton
                expand="block"
                fill="outline"
                routerLink={signMode === UserSignMode.In ? '/sign-up' : '/sign-in'}
                routerDirection={signMode === UserSignMode.In ? 'forward' : 'back'}
              >{signMode === UserSignMode.In ? 'Sign Up' : 'Sign In'}</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

async function signIn(
  userInfo: Partial<UserSignInInfo>,
  presentAlert: { (message: string, buttons?: AlertButton[] | undefined): void; (options: AlertOptions & HookOverlayOptions): void; },
  setUserInfo: (userInfo: Partial<UserSignInInfo>) => void,
) {
  if (await authSignIn(userInfo as UserSignInInfo)) {
    window.location.reload();
  } else {
    presentAlert('Fail to sign in.', [{ text: 'OK' }]);
    setUserInfo({});
  }
}

async function signUp(
  userInfo: Partial<UserSignUpInfo>,
  presentAlert: { (message: string, buttons?: AlertButton[] | undefined): void; (options: AlertOptions & HookOverlayOptions): void; },
  setUserInfo: (userInfo: Partial<UserSignInInfo>) => void,
) {
  if (await authSignUp(userInfo as UserSignUpInfo)) {
    presentAlert('Success to sign up, please login with your new credential.', [{ text: 'OK' }]);
    setUserInfo({});
  } else {
    presentAlert('Fail to sign up.', [{ text: 'OK' }]);
  }
}

async function digestText(text?: string) {
  if (text !== undefined) {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}

export default UserSignInOrUp;