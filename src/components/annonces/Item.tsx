import React from "react";
import { useHistory } from "react-router";
import "./Item.css";
import { IonImg } from "@ionic/react";
interface ItemProps {
  id: number;
  name: string;
  status: string;
  mileAge: number;
  transmission: string;
  fuelType: string;
  motorisation: string;
  status_css: string;
  pictures:string;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  status,
  status_css,
  mileAge,
  transmission,
  fuelType,
  motorisation,
  pictures
}) => {
  
  const history = useHistory();
  const onClickItem = (e:any) => {
    e.preventDefault();
    history.push("/home/details/" + id );
  };
  return (
    <>
      <div className="item" onClick={onClickItem}>
        <header className="item-header">
          <span className="car-name">{name}</span>
          <span className="status">
            <span className={"status-color " + status_css}>{status}</span>
          </span>
        </header>
        <main className="item-content">
          <div className="img">
            {
                pictures.length>0 && (
                  <img src={pictures[0].image} alt="" />
                )
            }
            
          </div>
          <div className="extra-info">
            <span>06/2015</span>
            <span>{mileAge}km</span>
            <span>{transmission}</span>
            <span>{fuelType}</span>
            <span>{motorisation}</span>
          </div>
        </main>
        <footer className="item-footer"></footer>
      </div>
    </>
  );
};

export default Item;
