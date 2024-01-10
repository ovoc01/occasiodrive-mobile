import React from "react";
import { IonItem, IonLabel, IonText, IonNote, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";

interface ItemProps {
  name: string;
  title: string;
  description: string;
  time: string;
}

const Item: React.FC<ItemProps> = ({ name, title, description, time }) => {
  return (
    <>
      <IonItem button={true} detail={false}>
        <div className="unread-indicator-wrapper" slot="start">
          <div className="unread-indicator"></div>
        </div>
        <IonLabel>
          <strong>{name}</strong>
          <IonText>{title}</IonText>
          <br />
          <IonNote color="medium" className="ion-text-wrap">
            {description}
          </IonNote>
        </IonLabel>
        <div className="metadata-end-wrapper" slot="end">
          <IonNote color="medium">{time}</IonNote>
          <IonIcon color="medium" icon={chevronForward}></IonIcon>
        </div>
      </IonItem>
    </>
  );
};

export default Item;
