import {
   IonContent,
   IonPage,
   IonRefresher,
   IonRefresherContent, IonSelect, IonSelectOption,
   IonCheckbox, IonDatetimeButton, IonModal, IonDatetime, IonHeader
} from "@ionic/react";

import "./style.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { base_url } from "../../settings/global";
import { db } from "../../settings/data-storage";

interface ItemProps {
   setAnnonceInfo: any
   step:any

}

const Annonce: React.FC<ItemProps> = () => {



   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const [name, setName] = useState(null);
   const [dateNaissance, setDate] = useState(null);
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [show, setShow] = useState(false);
   const [filesBase64, setFilesBase64] = useState<string[]>([]);
   const [sellingPrice, setSellingPrice] = useState()
   const [description, setDescription] = useState()
   const history = useHistory();





  
   const handleInputChange = (event: any) => {
      if (event.target.name === "email") {
         setEmail(event.target.value);
      } else if (event.target.name === "password") {
         setPassword(event.target.value);
      } else if (event.target.name === "name") {
         setName(event.target.value);
      } else if (event.target.name === "date") {
         setDate(event.target.value);
      }else if(event.target.name==="prix"){
         setSellingPrice(event.target.value)
      }else if (event.target.name==="description"){
         setDescription(event.target.value)
      }
   };

   const handleDateChange = (event: any) => {
      // Update the state when the date changes
      setDate(event.detail.value);
   };

   const doRefresh = (event: CustomEvent) => {
      // Simulate a refresh with a delay
      setError(null);
      setEmail(null);
      setName(null);
      setMessage(null);
      setTimeout(() => {
         event.detail.complete();
      }, 1000);
   };

   //Submit form
   const handleSubmit = (event: any) => {
      event.preventDefault();


      const data = {
          sellingPrice:sellingPrice,
          base64pic:filesBase64,
          description:description
      }

     
      localStorage.setItem("annonceInfo",JSON.stringify(data))
     

   };

   const handleFileChange = (event: any) => {
      const uploadedFiles = event.target.files;

      for (let i = 0; i < uploadedFiles.length; i++) {
         const reader = new FileReader();

         reader.onloadend = () => {
            setFilesBase64(prevState => [...prevState, reader.result?.toString() || '']);
         };

         reader.readAsDataURL(uploadedFiles[i]);
      }
      filesBase64.forEach(async (base64String) => {

         console.log(base64String)
      });

   }





   return (

      <IonContent fullscreen>
         <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent />
         </IonRefresher>
         <div className="container">
            <h3 className="description">
               Donner les descriptions de votre annonces
            </h3>
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <label htmlFor="email">Prix de vente:</label>
                  <input
                     className="input"
                     name="prix"
                     type="number"
                     id="email"
                     required
                     value={sellingPrice}
                     onChange={handleInputChange}
                  />
               </div>
               
               <div className="form-group">
                  <label htmlFor="pictures">Photo(s):</label>
                  <input className="input" type="file" multiple onChange={handleFileChange} />
               </div>
               <div className="image-uploaded">
                  {filesBase64.map((fileBase64, index) => (
                     <img key={index} src={fileBase64} alt="" style={{ width: '90px', height: '90px' }} />
                  ))}
               </div>

               <div className="form-group">
                  <label htmlFor="name">Description:</label>
                  <textarea
                     className="input"
                     name="description"
                     id="name"
                     required
                     value={description}
                     onChange={handleInputChange}
                     style={{ height: "100px" }}
                  />
               </div>


               {error && <h2 className="error">{error}</h2>}
               {message && <h2 className="message">{message}</h2>}
               {!show && (
                  <>
                     <button className="btn">
                        Suivant
                     </button>

                  </>
               )}
            </form>

         </div>
      </IonContent>

   );
};

export default Annonce;