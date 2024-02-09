import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/react";

import { Redirect, Route } from "react-router-dom";
import {
  addCircleOutline,
  homeOutline,
  notificationsOutline,
  exitOutline,
} from "ionicons/icons";

import { useLocation } from 'react-router-dom';

import "./Home.css";
import ListAnnonces from "../components/annonces/ListAnnonces";

import { IonReactRouter } from "@ionic/react-router";
import Details from "../components/annonces/Details";
import NewAnnonces from "./annonces/NewAnnonces";
import Footer from "../partial/Footer";

function Home() {
  const location = useLocation(); // Get the current location object


  return (
   
      <IonTabs>

        <IonRouterOutlet>
          <Route exact={true} path="/home/announces" component={ListAnnonces} />

          <Route exact={true} path={"/home/details/:idAnnounce"} component={Details} />

          <Route exact={true} path={"/home/add"} component={NewAnnonces} />

        </IonRouterOutlet>



        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home/announces">
            <IonIcon icon={homeOutline} />
            <IonLabel>Listes annonces</IonLabel>
          </IonTabButton>

          <IonTabButton tab="add" href="/home/add">
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Ajouter annonces</IonLabel>
          </IonTabButton>

          


          <IonTabButton tab="search" href="/search">
            <IonIcon icon={exitOutline} />
            <IonLabel>Log out</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>

   
  );
}

export default Home;
