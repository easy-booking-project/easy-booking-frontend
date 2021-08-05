import React from 'react';

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';

import styles from './UserSignInOrUp.module.css';

export enum UserSignMode {
  In,
  Up,
}

const UserSignInOrUp: React.FC<{ signMode: UserSignMode }> = ({ signMode }: { signMode: UserSignMode }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard className={styles['input-card']}>
          <IonCardHeader>
            <IonCardTitle>
              {signMode === UserSignMode.In ? 'Sign into your account' : 'Create your account'}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput type="text" />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" />
            </IonItem>
            <IonButton
              expand="block"
              onClick={() => {
                sessionStorage.setItem('mock-user-sign-in', 'Someone');
                window.location.reload();
              }}
            >
              {signMode === UserSignMode.In ? 'Sign In' : 'Sign Up'}
            </IonButton>
            <IonButton
              expand="block"
              fill="outline"
              routerLink={signMode === UserSignMode.In ? '/sign-up' : '/sign-in'}
              routerDirection={signMode === UserSignMode.In ? 'forward' : 'back'}
            >
              {signMode === UserSignMode.In ? 'Sign Up' : 'Sign In'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserSignInOrUp;
