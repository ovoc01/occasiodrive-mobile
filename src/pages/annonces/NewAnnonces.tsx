import {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent, IonSelect, IonSelectOption,
    IonCheckbox, IonDatetimeButton, IonModal, IonDatetime
} from "@ionic/react";

import "./style.css";
import React, {useState} from "react";
import {useHistory} from "react-router";

const NewAnnonces: React.FC = () => {

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [matricule,setMatricule] = useState<string>('');
    const[manifactureYear,setManifactureYear] = useState(null);
    const [usage,setUsage] = useState(null);
    const[puissance,setPuissance] = useState(null);


    const history = useHistory();

    const redirectToLogin = () => {
        history.push("/login");
    };

    const handleInputChange = (event: any) => {
        if(event.target.name==="matricule"){
            setMatricule(event.target.value)
        }else if(event.target.name==="kilometrage"){
            setUsage(event.target.value)
        }else if(event.target.name==="puissance"){
            setPuissance(event.target.value)
        }
    };


    const doRefresh = (event: CustomEvent) => {
        // Simulate a refresh with a delay
        setError(null);

        setMessage(null);
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    };

    const handleDateChange = (event: CustomEvent) => {
        setManifactureYear(event.detail.value);
    };

    //Submit form
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = {
            "brand":selectedBrand,
            "model":selectedModel,
            "matricule":matricule,
            "kilometrage":usage,
            "manifactureYear":manifactureYear,
            "puissance":puissance
        }

        console.log(data)

    };
    const handleBrandChange = (event: CustomEvent) => {
        setSelectedBrand(event.detail.value);
        // You can add logic here to dynamically set available models based on the selected brand.
    };

    const modelsByBrand: { [key: string]: string[] } = {
        mazda: ['MX-5', 'CX-5', 'Mazda3'],
        toyota: ['Camry', 'Corolla', 'RAV4'],
        mercedes: ['C-Class', 'E-Class', 'S-Class'],
    };
    const availableModels = selectedBrand ? modelsByBrand[selectedBrand] : [];

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent/>
                </IonRefresher>
                <div className="container">
                    <h3 className="description">
                        Ajouter une nouvelle annonce
                    </h3>
                    <form onChange={handleInputChange} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <IonSelect
                                label="Marque:"
                                labelPlacement="floating"
                                fill="outline"
                                value={selectedBrand}
                                onIonChange={handleBrandChange}
                            >
                                <IonSelectOption value="mazda">Mazda</IonSelectOption>
                                <IonSelectOption value="toyota">Toyota</IonSelectOption>
                                <IonSelectOption value="mercedes">Mercedes</IonSelectOption>
                            </IonSelect>
                        </div>

                        <div className="form-group">
                            <IonSelect
                                label="Modèle:"
                                labelPlacement="floating"
                                fill="outline"
                                value={selectedModel}
                                onIonChange={(e) => setSelectedModel(e.detail.value)}
                            >
                                {availableModels.map((model) => (
                                    <IonSelectOption key={model} value={model}>
                                        {model}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>
                        <div className="form-group">
                            <IonSelect label="Fuel type:" labelPlacement="floating" fill="outline">
                                <IonSelectOption value="apple">Essence</IonSelectOption>
                                <IonSelectOption value="banana">Diesel</IonSelectOption>
                                <IonSelectOption value="orange">Hydrogene</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div className="form-group custom-date">
                            <label htmlFor="name">Année de mise en circulation:
                            </label>
                            <div style={{marginBottom: "20px"}}>
                                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                                <IonModal keepContentsMounted={true}>
                                    <IonDatetime onIonChange={handleDateChange} presentation="year" id="datetime"></IonDatetime>
                                </IonModal>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Kilométrage:</label>
                            <input
                                className="input"
                                name="kilometrage"
                                type="number"
                                id="name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Matricule:</label>
                            <input
                                className="input"
                                name="matricule"
                                type="text"
                                id="name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Puissance moteur:</label>
                            <input
                                className="input"
                                name="puissance"
                                type="number"
                                id="name"
                                required
                            />
                        </div>

                        {error && <h2 className="error">{error}</h2>}
                        {message && <h2 className="message">{message}</h2>}
                        {!show && (
                            <>
                                <button className="btn" disabled={isLoading}>
                                    {isLoading ? "Veuillez patientez..." : "Créer"}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default NewAnnonces;
