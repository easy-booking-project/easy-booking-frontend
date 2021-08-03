import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';

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
import UserSignInOrUp, { UserSignMode } from './pages/UserSignInOrUp';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {
            sessionStorage.getItem('mock-user-sign-in') ?
              <Menu /> :
              <></>
          }
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              {
                sessionStorage.getItem('mock-user-sign-in') ?
                  <Home /> :
                  <Redirect to="/sign-in" />
              }
            </Route>
            <Route path="/sign-in" exact={true}>
              {
                sessionStorage.getItem('mock-user-sign-in') ?
                  <Redirect to="/home" /> :
                  <UserSignInOrUp signMode={UserSignMode.In} />
              }
            </Route>
            <Route path="/sign-up" exact={true}>
              {
                sessionStorage.getItem('mock-user-sign-in') ?
                  <Redirect to="/home" /> :
                  <UserSignInOrUp signMode={UserSignMode.Up} />
              }
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
