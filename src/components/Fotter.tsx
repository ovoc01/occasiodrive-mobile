import {IonIcon, IonLabel, IonTabBar, IonTabButton} from "@ionic/react";
import {document, playCircle, radio, search} from "ionicons/icons";
import React from "react";


function Footer(){
    return (
        <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
                <IonIcon icon={playCircle} />
                <IonLabel>Listen now</IonLabel>
            </IonTabButton>

            <IonTabButton tab="radio" href="/announces/add">
                <IonIcon icon={radio} />
                <IonLabel>Radio</IonLabel>
            </IonTabButton>

            <IonTabButton tab="library" href="/library">
                <IonIcon icon={document} />
                <IonLabel>Library</IonLabel>
            </IonTabButton>

            <IonTabButton tab="search" href="/search">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
            </IonTabButton>
        </IonTabBar>
    )
}


export default Footer;