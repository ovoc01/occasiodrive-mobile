
import "./style.css";
import React, { useEffect, useState } from "react";
import Annonce from "./DetailsAnnonce";
import CarDetail from "./DetailCar";
import { IonContent, IonHeader, IonLoading, IonRefresher, IonRefresherContent, IonRouterOutlet, IonSelect, IonSelectOption } from "@ionic/react";
import { Route, useHistory } from "react-router";
import axios from "axios";
import { base_url } from "../../settings/global";




function NewAnnonce() {

    //Data 
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMotorisations, setSelectedMotorisations] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedCarburant, setSelectedCarburant] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [carData, setCarData] = useState([])
    const[mileAge,setMileAge] = useState();
    const [disabled,setDisabled] = useState(false)


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [dateNaissance, setDate] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const [show, setShow] = useState(false);
    const [filesBase64, setFilesBase64] = useState<string[]>([]);
    const [sellingPrice, setSellingPrice] = useState()
    const [description, setDescription] = useState()
    const history = useHistory();

    const resetInput = ()=>{
        setSelectedBrand('')
        
    }



    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${base_url}/api/v1/brand`, { headers });
                console.log(res.data);
                return res.data;
            } catch (err: any) {
                if (err.response) {
                    console.log(err.response.data);
                }
            }
        };

        const loadData = async () => {
            /* const dataCar = localStorage.getItem('carData');
            if (dataCar) {
                setCarData(JSON.parse(dataCar));
                return;
            } */
            setIsLoading(true);
            const data = await fetchData();
            setCarData(data);
            localStorage.setItem('carData', JSON.stringify(data));
            setIsLoading(false);
        };

        loadData();
    }, []);

    const doRefresh = () => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${base_url}/api/v1/brand`, { headers });
                console.log(res.data);
                return res.data;
            } catch (err: any) {
                if (err.response) {
                    console.log(err.response.data);
                }
            }
        };

        const loadData = async () => {
            setIsLoading(true);
            const data = await fetchData();
            setCarData(data);
            localStorage.setItem('carData', JSON.stringify(data));
            setIsLoading(false);
        };

        loadData();
    }








    const handleBrandChange = (event: any) => {
        setSelectedBrand(event.detail.value);
        setSelectedModel('');
        setSelectedCategory('');
        setSelectedMotorisations('');
        setSelectedVersion('');
    };

    const handleModelChange = (event: any) => {
        setSelectedModel(event.detail.value);
        setSelectedCategory('');
        setSelectedMotorisations('');
        setSelectedVersion('');
    };

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.detail.value);
        setSelectedMotorisations('');
        setSelectedVersion('');
    };

    const handleMotorisationsChange = (event: any) => {
        setSelectedMotorisations(event.detail.value);
        setSelectedVersion('');
        setSelectedTransmission('');
    };

    const handleVersionChange = (event: any) => {
        setSelectedVersion(event.detail.value);
    };

    const handleTransmissionChange = (event: any) => {
        setSelectedTransmission(event.detail.value);
    }

    const handleCarburantChange = (event: any) => {
        setSelectedCarburant(event.detail.value);
    }

    const handleSubimt = (e: any) => {
        e.preventDefault()
        const data = {
            brand: selectedBrand,
            model: selectedModel,
            fuelType: selectedCarburant,
            motorisation: selectedMotorisations,
            transmission: selectedTransmission,
            version: selectedVersion,
            category: selectedCategory
        }


        resetInput()
    }

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

    const handleSubmit = (event: any) => {
        event.preventDefault();


        const data = {
            description:description,
            sellingPrice:sellingPrice,
            idModel:selectedModel,
            idCategory:selectedCategory,
            idMotorisation:selectedMotorisations,
            idVersion:selectedVersion,
            idBrand:selectedBrand,
            idTransmission:selectedTransmission,
            idFuelType:selectedCarburant,
            registration:"20349 TAB",
            mileAge:mileAge,
            photos:filesBase64
        }

        
        axios.
        post(base_url + "/api/v1/announces", data, { headers })
        .then((response)=>{
            setMessage(response.data.message)
        })
        .catch((error)=>{
            if (error.response) {
                console.error("Error occurs ", error.response.data.error);
                setError(error.response.data.error);
                setTimeout(()=>{
                  setError(null)
                },20000)
              }
        })

        console.log(data)


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
        } else if (event.target.name === "prix") {
            setSellingPrice(event.target.value)
        } else if (event.target.name === "description") {
            setDescription(event.target.value)
        }else if(event.target.name==="mileAge"){
            setMileAge(event.target.value)
            setDisabled(true)
        }
        
    };


    return <>
        <IonHeader>

        </IonHeader>
        <IonContent  className="ion-padding">
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent />
            </IonRefresher>
            {isLoading && (
                <IonLoading isOpen={true} message="Veuillez patientez...">

                </IonLoading>
            )}
           
                <div className="big-container">
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


                        
                    </form>

                
                
                    

                    <form>
                        <div className="form-group">
                            <IonSelect
                                label="Marque:"
                                labelPlacement="floating"
                                fill="outline"
                                value={selectedBrand}
                                onIonChange={handleBrandChange}
                            >
                                {carData.map((brand) => (
                                    <IonSelectOption key={brand.id_brand} value={brand.id_brand}>
                                        {brand.brand}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>

                        <div className="form-group">
                            <IonSelect
                                label="Modèle:"
                                labelPlacement="floating"
                                fill="outline"
                                value={selectedModel}
                                onIonChange={handleModelChange}
                                disabled={!selectedBrand || !carData.find((brand) => brand.id_brand === selectedBrand).models || carData.find((brand) => brand.id_brand === selectedBrand).models.length === 0}
                            >
                                {selectedBrand && carData.find((brand) => brand.id_brand === selectedBrand).models && carData.find((brand) => brand.id_brand === selectedBrand).models.length > 0 && carData.find((brand) => brand.id_brand === selectedBrand).models.map((model) => (
                                    <IonSelectOption key={model.id_model} value={model.id_model}>
                                        {model.model}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            {!selectedBrand || !carData.find((brand) => brand.id_brand === selectedBrand).models || carData.find((brand) => brand.id_brand === selectedBrand).models.length === 0 && (
                                <div className='info warning'>
                                    Cette marque n'as pas encore de modèle dans notre base de données
                                </div>
                            )}
                        </div>


                        {
                            selectedModel && (
                                <div className="form-group">
                                    <IonSelect
                                        label="Catégorie :"
                                        labelPlacement="floating"
                                        fill="outline"
                                        value={selectedCategory}
                                        onIonChange={handleCategoryChange}
                                        disabled={!selectedModel || !carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories || carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.length === 0}
                                    >
                                        {selectedModel && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.length > 0 && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.map((category) => (
                                            <IonSelectOption key={category.id_category} value={category.id_category}>
                                                {category.category}
                                            </IonSelectOption>
                                        ))}
                                    </IonSelect>
                                    {(!selectedModel || !carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories || carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.length === 0) && (
                                        <div className='info warning'>
                                            Cette marque n'as pas encore de catégories dans notre base de données.
                                        </div>
                                    )}
                                </div>
                            )
                        }


                        {
                            selectedCategory && (
                                <div className="form-group">
                                    <IonSelect label="Motorisations :" labelPlacement="floating" fill="outline"
                                        value={selectedMotorisations} onIonChange={handleMotorisationsChange}
                                        disabled={!selectedCategory}>
                                        {selectedCategory && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.find((category) => category.id_category === selectedCategory).motorisations.map((motorisation) => (
                                            <IonSelectOption key={motorisation.idMotorisation} value={motorisation.idMotorisation}>
                                                {motorisation.fullDescription}
                                            </IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </div>
                            )
                        }

                        {
                            selectedMotorisations && (
                                <div className="form-group">
                                    <IonSelect label="Version :" labelPlacement="floating" fill="outline"
                                        value={selectedVersion} onIonChange={handleVersionChange}
                                        disabled={!selectedMotorisations}>
                                        {selectedMotorisations && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.find((category) => category.id_category === selectedCategory).motorisations.find((motorisations) => motorisations.idMotorisation === selectedMotorisations).versions.map((version) => (
                                            <IonSelectOption key={version.idVersion} value={version.idVersion}>
                                                {version.intitule}
                                            </IonSelectOption>
                                        ))}

                                    </IonSelect>
                                </div>
                            )
                        }

                        {
                            selectedMotorisations && (
                                <>
                                    <div className="form-group">
                                        <IonSelect label="Transmission :" labelPlacement="floating" fill="outline"
                                            value={selectedTransmission} onIonChange={handleTransmissionChange}
                                            disabled={!selectedMotorisations}>
                                            {selectedMotorisations && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.find((category) => category.id_category === selectedCategory).motorisations.find((motorisation) => motorisation.idMotorisation === selectedMotorisations).transmissions.map((transmission) => (
                                                <IonSelectOption key={transmission.id_transmission} value={transmission.id_transmission}>
                                                    {transmission.name}
                                                </IonSelectOption>
                                            ))}

                                        </IonSelect>
                                    </div>
                                    <div className="form-group">
                                        <IonSelect label="Carburant :" labelPlacement="floating" fill="outline"
                                            value={selectedCarburant} onIonChange={handleCarburantChange}
                                            disabled={!selectedMotorisations}>
                                            {selectedMotorisations && carData.find((brand) => brand.id_brand === selectedBrand).models.find((model) => model.id_model === selectedModel).categories.find((category) => category.id_category === selectedCategory).motorisations.find((motorisation) => motorisation.idMotorisation === selectedMotorisations).fuelTypes.map((fuel) => (
                                                <IonSelectOption key={fuel.id_fuel_type} value={fuel.id_fuel_type}>
                                                    {fuel.label}
                                                </IonSelectOption>
                                            ))}

                                        </IonSelect>
                                    </div>

                                    {
                                        selectedTransmission && selectedCarburant && selectedVersion && (
                                            <div className="form-group">
                                                <label htmlFor="email">Kilometrage:</label>
                                                <input
                                                    className="input"
                                                    name="mileAge"
                                                    type="number"
                                                    id="Kilometrage"
                                                    required
                                                    value={mileAge}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }

                        <div className="form-group">
                            <button className="btn" style={{ marginBottom: "40px" }} onClick={handleSubmit} disabled={!disabled}>
                                Validez
                            </button>
                        </div>

                    </form>
                
            </div>

        </IonContent>


    </>

}

export default NewAnnonce;
