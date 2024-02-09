import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import {
  playCircle,
  radio,
  library,
  search,
  addCircleOutline,
} from "ionicons/icons";

import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register/Register";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Details from "./components/annonces/Details";
import NewAnnonces from "./pages/annonces/NewAnnonces";


setupIonicReact();

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    console.log("Ato alouha");
    // history.push("/home/announces")
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home/announces">
            <Home />
          </Route>
          <Route exact={true} path={"/home/details/:idAnnounce"}  >
            <Details />
          </Route>
          <Route exact={true} path={"/home/add"} >
            <NewAnnonces />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
