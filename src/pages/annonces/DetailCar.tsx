import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../settings/global';
/* import carData from './data.json'; */
import {
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonSelect,
    IonSelectOption,
    IonLoading,
    IonHeader,
    IonToolbar,
    IonTitle
} from "@ionic/react";

interface ItemProps {
    setCarDetailInfo:any
    annonceInfo:any
  }
  

const  CarDetail:React.FC<ItemProps> = () => {

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMotorisations, setSelectedMotorisations] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedCarburant, setSelectedCarburant] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [carData, setCarData] = useState([])

    
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

    const handleSubimt = (e:any) =>{
        e.preventDefault()
        const data = {
            brand:selectedBrand,
            model:selectedModel,
            fuelType:selectedCarburant,
            motorisation:selectedMotorisations,
            transmission:selectedTransmission,
            version:selectedVersion,
            category:selectedCategory
        }

       
    }


    return (
        <>
            <IonHeader>
                    <button>Retour</button>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent />
                </IonRefresher>
                {isLoading && (
                    <IonLoading isOpen={true} message="Veuillez patientez...">

                    </IonLoading>
                )}
                <div className="container">
                    <h3 className="description">
                        Donner les details de votre voitures

                    </h3>
                    
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
                                                    name="prix"
                                                    type="number"
                                                    id="Kilometrage"
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }

                        <div className="form-group">
                            <button className="btn" style={{marginBottom:"40px"}} onClick={handleSubimt}>
                                Validez
                            </button>
                        </div>




                    </form>
                </div>
            </IonContent>
        </>
    );
}

export default CarDetail;
