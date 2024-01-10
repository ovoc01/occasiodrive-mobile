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
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

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

  const handleDateChange = (event: CustomEvent) => {
    // Update the state when the date changes
    setDate(event.detail.value || "");
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
    setIsLoading(true);

    const loginCredential = {
      email: email,
      password: password,
      name: name,
      date: date,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(base_url + "/api/v1/auth/register", loginCredential, { headers })
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
          }, 5000);
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
                <IonDatetime  presentation="date" id="datetime"></IonDatetime>
              </IonModal>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                className="input"
                name="password"
                type="password"
                id="password"
                required
              />
            </div>
            {error && <h2 className="error">{error}</h2>}
            {message && <h2 className="message">{message}</h2>}
            {!show && (
              <>
                <button className="btn" disabled={isLoading}>
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
