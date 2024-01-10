import React from "react";
import { IonItem, IonLabel, IonText, IonNote, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import './Item.css'
interface ItemProps {
  name: string;
  title: string;
  description: string;
  time: string;
}

const Item: React.FC<ItemProps> = ({ name, title, description, time }) => {
  return (
    <>
      <div className="item">
        <header className="item-header">
          <span className="car-name">Renault Kadjar 1.2 TCe Energy</span>
          <span className="status">
            <span className="status-color">Vendu</span>
          </span>
        </header>
        <main className="item-content">
          <div className="img"></div>
          <div className="extra-info">
            <span>06/2015</span>
            <span>99 334km</span>
            <span>Manuel</span>
            <span>Essence</span>
            <span>96 kw (130 cv)</span>
          </div>
        </main>
        <footer className="item-footer"></footer>
      </div>
    </>
  );
};

export default Item;
