import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Explore: React.FC = () => {
  const [data, setData] = useState<{ category: string, rooms: string[] }[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          category: 'Study Room',
          rooms: [
            'Room 1',
            'Room 2',
            'Room 3',
          ],
        },
        {
          category: 'Meeting Room',
          rooms: [
            'Room 4',
            'Room 5',
            'Room 6',
          ],
        },
      ]);
    }, 3000);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          data?.length ?
            <IonList>
              {
                data.map(datum => (
                  <>
                    <IonListHeader key={datum.category}>
                      <IonLabel>{datum.category}</IonLabel>
                    </IonListHeader>
                    {datum.rooms?.map(room => (
                      <IonItem key={room} button style={{ display: 'inline-block', width: '200px' }}>{room}</IonItem>
                    ))}
                  </>
                ))
              }
            </IonList> :
            <IonList>
              {
                [0, 1, 2].map(() => (
                  <>
                    <IonListHeader>
                      <IonLabel>
                        <IonSkeletonText animated style={{ width: '20%' }} />
                      </IonLabel>
                    </IonListHeader>
                    {
                      [0, 1, 2].map(value => (
                        <IonItem key={value} style={{ display: 'inline-block', width: '200px' }}>
                          <IonSkeletonText animated style={{ width: '80%' }} />
                        </IonItem>
                      ))
                    }
                  </>
                ))
              }
            </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Explore;
