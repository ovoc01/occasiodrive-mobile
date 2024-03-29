import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";

import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { base_url } from "../../settings/global";
import { toast } from "sonner";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(null);
  const [dateNaissance, setDate] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };

  const handleInputChange = (event: any) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "date") {
      setDate(event.target.value);
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


  const handleShowPassword = (event: any) => {
    console.log(event.target.checked)
    if (event.target.name === "show-password") {
      setShowPassword(!showPassword);
    }
  }

  //Submit form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsLoading(true);


    const registerCredential = {
      email: email,
      password: password,
      fullName: name,
      birthDate: dateNaissance,
      gender:1
    };

    console.log(registerCredential)
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(base_url + "/api/v1/auth/register", registerCredential, { headers })
      .then((response) => {
        if (response.status === 201) {

          setMessage(response.data.message);
          setShow(true);
          //history.push("/login")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error occurs ", error.response.data.error);
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 50000);
        }else{
          setError("Une erreur est survenue, veuillez réessayer plus tard");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="container">
          <h3 className="description">
            Inscrivez vous gratuitement maintenant
          </h3>
          <form onChange={handleInputChange} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom et prénom:</label>
              <input
                className="input"
                name="name"
                type="text"
                id="name"
                
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                className="input"
                name="email"
                type="email"
                id="email"
                required
              />
            </div>
            <div className="form-group date">
              <label htmlFor="name">Date de naissance:</label>
              <IonDatetimeButton  datetime="datetime"></IonDatetimeButton>

              <IonModal  keepContentsMounted={true}>
                <IonDatetime  onIonChange={handleDateChange} presentation="date" id="datetime"></IonDatetime>
              </IonModal>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              
              <input
                className="input"
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                required
              />
            </div>
            <div className="form-group">
            <label htmlFor="show-password">Affichez mot de passe:</label>
              <input  id="show-password" name="show-password" type="checkbox" className="show-password" onClick={handleShowPassword}/>
            </div>
            {error && <h2 className="error">{error}</h2>}
            {message && <h2 className="message">{message}</h2>}
            {!show && (
              <>
                <button  className="btn" disabled={isLoading}>
                  {isLoading ? "Veuillez patientez..." : "S'inscrire"}
                </button>
                ou
              </>
            )}
          </form>
          <button onClick={redirectToLogin} className="link btn">
            Se connecter
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
