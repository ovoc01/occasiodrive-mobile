import {
  IonContent,
  IonHeader,
  IonList,
  IonLoading,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Item from "./Item";
import axios from "axios";
import { base_url } from "../../settings/global";

function ListAnnonces() {
  const [announce, setAnnounce] = React.useState([]);
  const [notContent, setNotContent] = React.useState(false);
  const [isDataFetch,setIsDataFetch] = React.useState(false)

  React.useEffect(() => {
    
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${base_url}/api/v1/announces/person`, { headers })
      .then((response) => {
        console.log(response);
        setAnnounce(response.data.listAnnounces);
        localStorage.setItem(
          "announce",
          JSON.stringify(response.data.listAnnounces),
        );
        if (response.status === 204) {
          setNotContent(true);
        }
        
        console.log(announce);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setIsDataFetch(true)
      });
  },[])

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listes de mes annonces</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
         {announce.map((announce: any) => {
          return (
            <IonList inset={true}>
              <Item
                key={announce.id}
                id={announce.id}
                pictures={announce.pictures}
                name={
                  announce.car.model.brand.brand +
                  " " +
                  announce.car.model.model
                }
                status_css={announce.status_css}
                status={announce.status_intitule}
                mileAge={announce.car.mileAge}
                transmission={announce.car.transmission.name}
                fuelType={announce.car.fuelType.label}
                motorisation={announce.car.motorisation.fullDescription}
              />
            </IonList>
          );
        })} 
         {
          !isDataFetch && (
              <IonLoading isOpen={true} message={"Recuperation de vos annonces"}></IonLoading>
          )
        } 
      </IonContent>
    </>
  );
}

export default ListAnnonces;
