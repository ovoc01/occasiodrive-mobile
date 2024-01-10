import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonLabel,
  IonText,
  IonItem,
  IonNote,
  IonFabButton,
  IonFab,
  IonFabList
} from "@ionic/react";

import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from "ionicons/icons";

import { chevronForward, listCircle } from "ionicons/icons";

import "./Home.css";
import ListAnnonces from "../components/annonces/ListAnnonces";

function Home() {
  return (
    <>
      <IonMenu side="end" contentId="main-content">
        <IonHeader>
          <IonToolbar>Menu</IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"></IonContent>
      </IonMenu>
      <IonPage id="main-content" color="light">
        <IonHeader>
          <IonToolbar style={{ backgroundColor: "#0d4f78" }}>
            <IonButtons slot="end">
              <IonMenuButton color={"dark"}></IonMenuButton>
            </IonButtons>
            <span>OcassioDrive</span>
          </IonToolbar>
        </IonHeader>
        <IonContent >
          <ListAnnonces />
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton>
              <IonIcon icon={chevronUpCircle}></IonIcon>
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton>
                <IonIcon icon={document}></IonIcon>
              </IonFabButton>
              <IonFabButton>
                <IonIcon icon={colorPalette}></IonIcon>
              </IonFabButton>
              <IonFabButton>
                <IonIcon icon={globe}></IonIcon>
              </IonFabButton>
            </IonFabList>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
  
  
}
export default Home;
