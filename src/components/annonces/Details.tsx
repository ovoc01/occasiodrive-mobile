import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonImg,
  IonBackButton,
  IonButtons,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import "./Details.css";
import {
  optionsOutline,
  settingsOutline,
  scaleOutline,
  mapOutline,
  informationOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { base_url } from "../../settings/global";


interface RouteParams {
  idAnnounce: string;
}
function Details() {
  const param = useParams<{ idAnnounce: string }>(); // Specify the type of idAnnounce
  const [a, setA] = useState<any>(null);
  const announce = localStorage.getItem("announce");
  const data = JSON.parse(announce);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  

  const [isLoading, setIsLoading] = useState(false);

  const detail = data.filter((item: any) => {
    return item.id === Number(param.idAnnounce);
  });

  const token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const deleteAnnounce = () => {
    setIsLoading(true)
 
    console.log("atooo")
    axios
      .delete(base_url + "/api/v1/announces/" + param.idAnnounce, {
        headers: headers
      })
      .then((response) => {
        setMessage(response.data.message)
        setIsOpen(true)
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          //setError(error.response.data.error)
          console.log(error.response.data)
          setTimeout(() => {
            setError(null)
          }, 20000)
        }
      }).finally(() => {
        setIsLoading(false)
      })
      

     


  }


  const sellAnnounce = () => {
      setIsLoading(true)
      axios
      .post(base_url + "/api/v1/announces/selling/" + param.idAnnounce, {
        headers: headers
      })
      .then((response) => {
        setMessage(response.data.message)
        setIsOpen(true)
        
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          //setError(error.response.data.error)
          console.log(error.response.data)
          setTimeout(() => {
            setError(null)
          }, 20000)
        }
      }).finally(() => {
        setIsLoading(false)
      })
  }

  console.log("andrana kely ", detail[0].pictures.length > 0)
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/announces"></IonBackButton>
          </IonButtons>
          <IonTitle>Détail annonce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="announce-details">
          <div className={"announce-img "+ detail[0].pictures.length > 0 ? "no-img":"" }>
            {
              detail[0].pictures.length > 0 && (
                <IonImg
                  src={detail[0].pictures[0].image}
                  alt="The Wisconsin State Capitol building in Madison, WI at night"
                ></IonImg>
              )
            }
            <span className="btn-container">
            {
              detail[0].status >= 0 && detail[0].status <= 10 && (<>
                <button className="del" onClick={deleteAnnounce}>Supprimé</button>
              </>    
              
              )
            }
            {
              detail[0].status >=10 && (
                <button className="sell" onClick={sellAnnounce}>Vendu</button>
              )
            }
            </span>

          </div>
          <div className="announce-info">
            <h2>Titre de l'annonce</h2>
            <p>{detail[0].description}</p>
            <div className="announce-price">
              <h2>{detail[0].sellingPrice}€</h2>
            </div>
          </div>
          <div className="details">
            <h3>Détails</h3>

            <div className="car-info">
              <IonIcon
                icon={informationOutline}
                size="large"
                color="secondary"
              ></IonIcon>
              <span className="title"> Intitule</span>
              <span className="value">Mazda 6 version Standard</span>
            </div>
            <div className="car-info">
              <IonIcon
                icon={optionsOutline}
                size="large"
                color="secondary"
              ></IonIcon>
              <span className="title"> Transmission</span>
              <span className="value">{detail[0].car.transmission.name}</span>
            </div>
            <div className="car-info">
              <IonIcon
                icon={scaleOutline}
                size="large"
                color="secondary"
              ></IonIcon>
              <span className="title"> Carburant</span>
              <span className="value">{detail[0].car.fuelType.label}</span>
            </div>
            <div className="car-info">
              <IonIcon
                icon={settingsOutline}
                size="large"
                color="secondary"
              ></IonIcon>
              <span className="title">Motorisation</span>
              <span className="value">{detail[0].car.motorisation.fullDescription}</span>
            </div>
            <div className="car-info">
              <IonIcon
                icon={mapOutline}
                size="large"
                color="secondary"
              ></IonIcon>
              <span className="title"> Kilométrage</span>
              <span className="value">{detail[0].car.mileAge} km</span>
            </div>
          </div>

        </div>
        {
          isLoading ? (
            <IonLoading isOpen={true} message="Veuillez patientez..."></IonLoading>
          ) : <></>
        }
        
      </IonContent>
      <IonAlert
          isOpen={isOpen}
          header="Message"
          message={message}
          buttons={['Action']}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
    </>
  );
}

export default Details;
