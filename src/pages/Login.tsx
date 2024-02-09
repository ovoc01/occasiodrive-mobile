import {
  IonContent,
  IonPage,
  IonLoading,
} from "@ionic/react";

import "./Login.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { base_url } from "../settings/global";

import {useHistory} from "react-router"

const Home: React.FC = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const[error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  
  
 
    
  const handleInputChange = (event: any) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  
 


   const mooveToRegister = (event:any) => {
      event.preventDefault()
      history.push('/register')
   };
  //Submit form
  const handleSubmit = (event: any) => {
    event.preventDefault();
   
   setIsLoading(true);
    const loginCredential = {
      email: email,
      password: password,
    };
    const headers = {
      "Content-Type": "application/json",
    };



    axios
      .post(base_url + "/api/v1/auth/login", loginCredential, { headers })
      .then((response) => {
        if (response.status === 200) {
          const token: string = response.data.token;
          localStorage.setItem("token", token);
          history.push('/home/announces')
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error occurs ", error.response.data.error);
          setError(error.response.data.error);
          setTimeout(()=>{
            setError(null)
          },20000)
        }
      }).finally(()=>{
         setIsLoading(false);
      })
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        
        <div className="container">
          <h3 className="description">Connectez vous à votre compte</h3>
          <form onChange={handleInputChange} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                className="input"
                name="email"
                type="email"
                id="email"
                required={true}
                value={email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                className="input"
                name="password"
                type="password"
                id="password"
                required={true}
                value={password}
              />
              
            </div>
            
            {error && <h2 className="error">{error}</h2>}
            <button className="btn" disabled={isLoading}>
              {isLoading ? (
                <IonLoading isOpen={true} message="Veuillez patientez...">
                  
                </IonLoading>
              ) : (
                "S'identifier"
              )}
            </button>
            ou
          </form>
          {!isLoading && (
            <button className="link btn" onClick={mooveToRegister}>
              S'inscrire
            </button>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
