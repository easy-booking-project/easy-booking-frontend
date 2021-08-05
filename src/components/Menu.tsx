import React from 'react';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, logOutOutline, logOutSharp } from 'ionicons/icons';

import './Menu.css';
import { signOut } from '../utils/auth';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="primary-menu-list">
          <IonListHeader>Username</IonListHeader>
          <IonNote>User Role</IonNote>
          {appPages.map((appPage, index) => {
            const toggleKey = `ion-menu-toggle-${index}`;

            return (
              <IonMenuToggle key={toggleKey} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList id="secondary-menu-list">
          <IonItem
            button
            lines="none"
            onClick={async () => {
              await signOut();
              window.location.reload();
            }}
          >
            <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
            <IonLabel>Sign Out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
