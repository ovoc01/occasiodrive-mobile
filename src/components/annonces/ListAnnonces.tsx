import { IonList } from "@ionic/react";
import React from "react";
import Item from "./Item";

function ListAnnonces(){
    return (
      <>
        <IonList inset={true}>
          <Item
            name="Rick Astley"
            title="Never Gonna Give You Up"
            description="Never gonna give you up Never gonna let you down Never gonna run..."
            time="06:11"
          />
        </IonList>
        <IonList inset={true}>
          <Item
            name="Rick Astley"
            title="Never Gonna Give You Up"
            description="Never gonna give you up Never gonna let you down Never gonna run..."
            time="06:11"
          />
        </IonList>
      </>
    );
}

export default ListAnnonces;