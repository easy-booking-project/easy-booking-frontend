import React, { useState } from 'react';

import {
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Calendar from '@toast-ui/react-calendar';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import styles from './Home.module.css';

const Home: React.FC = () => {
  const [calendarView, setCalendarView] = useState('week');
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);

  // TODO this is a ugly solution to fix calender height
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(() => {
      setIsShowingCalendar(false);
      setTimeout(() => {
        setIsShowingCalendar(true);
      });
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
          <IonSelect
            slot="end"
            interface="popover"
            value={calendarView}
            onIonChange={({ detail }) => setCalendarView(detail.value)}
          >
            {['month', 'week', 'day'].map((view, index) => {
              const optionKey = `select-option-${index}`;
              return (
                <IonSelectOption value={view} key={optionKey}>
                  {view[0].toUpperCase() + view.substring(1)}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <IonCard className={styles['calender-container']} ref={(el) => resizeObserver.observe(el as HTMLIonCardElement)}>
          {isShowingCalendar && <Calendar height="100%" view={calendarView} useDetailPopup useCreationPopup />}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
