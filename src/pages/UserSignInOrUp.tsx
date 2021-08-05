import { TextFieldTypes } from "@ionic/core";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import styles from './UserSignInOrUp.module.css';

export enum UserSignMode {
  In,
  Up
}

const inputDefinitions = [
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
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard className={styles['input-card']}>
          <IonCardHeader>
            <IonCardTitle>{signMode === UserSignMode.In ? 'Sign into your account' : 'Create your account'}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* TODO use a form */}
            {
              inputDefinitions.map(inputDefinition => (
                <IonItem key={inputDefinition.name}>
                  <IonLabel position="floating">{inputDefinition.label}</IonLabel>
                  <IonInput type={inputDefinition.type as TextFieldTypes} required={inputDefinition.required}></IonInput>
                </IonItem>
              ))
            }
            <IonButton
              expand="block"
              onClick={() => {
                sessionStorage.setItem('mock-user-sign-in', 'Someone');
                window.location.reload();
              }}
            >{signMode === UserSignMode.In ? 'Sign In' : 'Sign Up'}</IonButton>
            <IonButton
              expand="block"
              fill="outline"
              routerLink={signMode === UserSignMode.In ? '/sign-up' : '/sign-in'}
              routerDirection={signMode === UserSignMode.In ? 'forward' : 'back'}
            >{signMode === UserSignMode.In ? 'Sign Up' : 'Sign In'}</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserSignInOrUp;