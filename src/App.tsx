import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import UserSignInOrUp, { UserSignMode } from './pages/UserSignInOrUp';
import { useEffect, useState } from 'react';
import { fetchUser } from './utils/auth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [routerContent, setRouterContent] = useState<any>();

  useEffect(() => {
    async function generateRouterOutlet() {
      const hasSignedIn = await fetchUser();
      setRouterContent((
        <IonSplitPane contentId="main">
          {
            hasSignedIn ? <Menu /> : <></>
          }
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              {
                hasSignedIn ? <Home /> : <Redirect to="/sign-in" />
              }
            </Route>
            <Route path="/sign-in" exact={true}>
              {
                hasSignedIn ? <Redirect to="/home" /> : <UserSignInOrUp signMode={UserSignMode.In} />
              }
            </Route>
            <Route path="/sign-up" exact={true}>
              {
                hasSignedIn ? <Redirect to="/home" /> : <UserSignInOrUp signMode={UserSignMode.Up} />
              }
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      ));
    }
    generateRouterOutlet();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {routerContent}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
