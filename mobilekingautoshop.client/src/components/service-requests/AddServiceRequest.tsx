/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DropdownControl from "../../controls/DropdownControl";
import TextFieldControl from "../../controls/TextFieldControl";
import IAddServiceRequest from "../../interfaces/components/IAddServiceRequest";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import createChoices from "../../utilities/CreateChoices";
import { YEARS } from "../../Settings";
import {
    APIProvider,
    Map,
    MapControl,
    useMap,
    useAdvancedMarkerRef,
    useMapsLibrary,
    AdvancedMarker,
    ControlPosition
} from '@vis.gl/react-google-maps';
import SECRETS from "../../Secrets";
import checkServiceRequestFormValidity from "../../utilities/CheckServiceRequestFormValidity";
import addServiceRequestWithVehicle from "../../services/service-requests/AddServiceRequestWithVehicle";
import addServiceRequest from "../../services/service-requests/AddServiceRequest";
import DateTimeControl from "../../controls/DateTimeControl";
import getVehiclesByEmail from "../../services/vehicles/GetVehiclesByEmail";
import IVehicle from "../../interfaces/IVehicle";
import getCookie from "../../utilities/GetCookie";

export default function AddServiceRequest(props: IAddServiceRequest) {
    const { language } = props;
    const [serviceRequestInformation, setServiceRequestInformation] = React.useState<any>({
        email: "",
        vehicleID: 0,
        make: "",
        model: "",
        year: 0,
        color: "",
        issue: "",
        serviceDate: null,
        serviceDateString: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        country: ""
    });
    const [isNewCar, setIsNewCar] = React.useState(false);
    const [selectedPlace, setSelectedPlace] =
        React.useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        vehicleID: "",
        make: "",
        model: "",
        year: "",
        color: "",
        issue: "",
        serviceDate: "",
        location: ""
    });
    const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);

    React.useEffect(() => {
        async function getVehiclesByEmailResponse() {
            const vehiclesByEmailResponse = await getVehiclesByEmail({ language: language, email: email });
            if (!vehiclesByEmailResponse.doesErrorExist) {
                setVehicles(vehiclesByEmailResponse.vehicles);
            } else {
                setErrorMessage(vehiclesByEmailResponse.errorMessage);
            }
        }
        const email = getCookie("email");
        if (!email) {
            window.open("/login?sourceURL=/service-requests/add", "_self");
        }
        else {
            setServiceRequestInformation({
                ...serviceRequestInformation,
                email: email
            });
            getVehiclesByEmailResponse();
        }
    }, []);

    React.useEffect(() => {
        if (!selectedPlace || !selectedPlace.address_components) return;
        setServiceRequestInformation({
            ...serviceRequestInformation,
            address: selectedPlace?.address_components[0].long_name + " " + selectedPlace?.address_components[1].long_name,
            city: selectedPlace?.address_components[2].long_name,
            zipCode: selectedPlace?.address_components[7].long_name,
            state: selectedPlace?.address_components[5].long_name,
            country: selectedPlace?.address_components[6].long_name,
        });
    }, [selectedPlace])

    interface MapHandlerProps {
        place: google.maps.places.PlaceResult | null;
        marker: google.maps.marker.AdvancedMarkerElement | null;
    }

    const MapHandler = ({ place, marker }: MapHandlerProps) => {
        const map = useMap();

        React.useEffect(() => {
            if (!map || !place || !marker) return;

            if (place.geometry?.viewport) {
                map.fitBounds(place.geometry?.viewport);
            }
            marker.position = place.geometry?.location;
        }, [map, place, marker]);

        return null;
    };
    interface PlaceAutocompleteProps {
        onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    }

    const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
        const [placeAutocomplete, setPlaceAutocomplete] =
            React.useState<google.maps.places.Autocomplete | null>(null);
        const inputRef = React.useRef<HTMLInputElement>(null);
        const places = useMapsLibrary('places');

        React.useEffect(() => {
            if (!places || !inputRef.current) return;

            const options = {
                fields: ['geometry', 'name', 'formatted_address', 'address_components']
            };

            setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
        }, [places]);

        React.useEffect(() => {
            if (!placeAutocomplete) return;

            placeAutocomplete.addListener('place_changed', () => {
                onPlaceSelect(placeAutocomplete.getPlace());
            });
        }, [onPlaceSelect, placeAutocomplete]);

        return (
            <div className="autocomplete-container">
                <input ref={inputRef} />
            </div>
        );
    };

    const handleTextChange = (event: any) => {
        setServiceRequestInformation({
            ...serviceRequestInformation,
            [event.target.id]: event.target.value
        });
    }

    const handleDateTimeChange = (event: any) => {
        setServiceRequestInformation({
            ...serviceRequestInformation,
            serviceDateString: event.target.value,
            serviceDate: new Date(event.target.value)
        })
    }

    const handleDropdownChange = (event: any) => {
        setServiceRequestInformation({
            ...serviceRequestInformation,
            [event.target.id]: event.target.value
        })
    }

    const handleCarChange = (event: any) => {
        const vehicleID = parseInt(event.target.value);
        let filteredVehicle = {
            Make: "",
            Model: "",
            Year: 0,
            Color: ""
        }
        if (!!vehicleID) {
            filteredVehicle = vehicles.filter(vehicle => vehicleID === vehicle.VehicleID)[0];
        }
        setServiceRequestInformation({
            ...serviceRequestInformation,
            vehicleID: vehicleID,
            make: filteredVehicle.Make,
            model: filteredVehicle.Model,
            year: filteredVehicle.Year,
            color: filteredVehicle.Color
        })
    }

    const submitForm = async () => {
        setIsLoading(true);
        const serviceRequestFormValidity = checkServiceRequestFormValidity({
            vehicleID: serviceRequestInformation.vehicleID,
            make: serviceRequestInformation.make,
            model: serviceRequestInformation.model,
            year: serviceRequestInformation.year,
            color: serviceRequestInformation.color,
            issue: serviceRequestInformation.issue,
            serviceDate: serviceRequestInformation.serviceDate,
            address: serviceRequestInformation.address,
            isNewCar: isNewCar,
            language: language
        });
        if (serviceRequestFormValidity.doErrorsExist) {
            setFormErrors(serviceRequestFormValidity.errors);
        }
        else {
            if (isNewCar) {
                const addServiceRequestWithVehicleResponse = await addServiceRequestWithVehicle({
                    item: {
                        ServiceRequestID: 0,
                        CustomerEmail: serviceRequestInformation.email,
                        Make: serviceRequestInformation.make,
                        Model: serviceRequestInformation.model,
                        Year: serviceRequestInformation.year,
                        Color: serviceRequestInformation.color,
                        IssueDescription: serviceRequestInformation.issue,
                        ServiceDate: serviceRequestInformation.serviceDate,
                        Status: "Pending",
                        Address: serviceRequestInformation.address,
                        City: serviceRequestInformation.city,
                        State: serviceRequestInformation.state,
                        ZipCode: serviceRequestInformation.zipCode,
                        Country: serviceRequestInformation.country,
                    }
                });
                if (addServiceRequestWithVehicleResponse.doesErrorExist) {
                    setErrorMessage(addServiceRequestWithVehicleResponse.errorMessage);
                }
                else {
                    setErrorMessage("");
                    setIsSuccessful(true);
                }
            }
            else {
                const addServiceRequestResponse = await addServiceRequest({
                    item: {
                        ServiceRequestID: 0,
                        CustomerEmail: serviceRequestInformation.email,
                        VehicleID: serviceRequestInformation.vehicleID,
                        IssueDescription: serviceRequestInformation.issue,
                        ServiceDate: serviceRequestInformation.serviceDate,
                        Status: "Pending",
                        Address: serviceRequestInformation.address,
                        City: serviceRequestInformation.city,
                        State: serviceRequestInformation.state,
                        ZipCode: serviceRequestInformation.zipCode,
                        Country: serviceRequestInformation.country,
                    }
                });
                if (addServiceRequestResponse.doesErrorExist) {
                    setErrorMessage(addServiceRequestResponse.errorMessage);
                }
                else {
                    setErrorMessage("");
                    setIsSuccessful(true);
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer">
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading}</span>
                </div>
            }
            {!!errorMessage &&
                <div className="errorContainer">
                    <span>{errorMessage}</span>
                </div>
            }
            {isSuccessful &&
                <div className="successContainer">
                    <span>{language === "English" ? EnglishStrings.NewServiceRequestSuccess : SpanishStrings.NewServiceRequestSuccess}</span>
                </div>
            }
            <div hidden={isSuccessful}>
                <h2>{language === "English" ?
                    EnglishStrings.Vehicle :
                    SpanishStrings.Vehicle
                }</h2>
                <div className="actionButtonsContainer">
                    {!isNewCar &&
                        <button onClick={() => setIsNewCar(true)}>
                            {language === "English" ?
                                EnglishStrings.NewVehicle :
                                SpanishStrings.NewVehicle}
                        </button>
                    }
                    {isNewCar &&
                        <button onClick={() => setIsNewCar(false)}>
                            {language === "English" ?
                                EnglishStrings.ExistingVehicle :
                                SpanishStrings.ExistingVehicle}
                        </button>
                    }
                </div>
                {!isNewCar &&
                    <DropdownControl
                        fieldLabel={language === "English" ?
                            EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                        onChangeDropdown={handleCarChange}
                        currentValue={serviceRequestInformation.vehicleID}
                        dropdownOptions={createChoices({
                            items: vehicles,
                            labelProperty: "Model",
                            valueProperty: "VehicleID"
                        })}
                        inputID="vehicleID"
                        isDisabled={false}
                    />
                }
                <div
                    className="errorContainer"
                    hidden={!formErrors.vehicleID}
                >
                    <span>{formErrors.vehicleID}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Make : SpanishStrings.Make}
                    onChangeTextField={handleTextChange}
                    currentValue={serviceRequestInformation.make}
                    inputID="make"
                    isExpandable={false}
                    isDisabled={!isNewCar}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.make}
                >
                    <span>{formErrors.make}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Model : SpanishStrings.Model}
                    onChangeTextField={handleTextChange}
                    currentValue={serviceRequestInformation.model}
                    inputID="model"
                    isExpandable={false}
                    isDisabled={!isNewCar}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.model}
                >
                    <span>{formErrors.model}</span>
                </div>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Year : SpanishStrings.Year}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={serviceRequestInformation.year}
                    dropdownOptions={createChoices({
                        items: YEARS,
                        labelProperty: "value",
                        valueProperty: "value"
                    })}
                    inputID="year"
                    isDisabled={!isNewCar}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.year}
                >
                    <span>{formErrors.year}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Color : SpanishStrings.Color}
                    onChangeTextField={handleTextChange}
                    currentValue={serviceRequestInformation.color}
                    inputID="color"
                    isExpandable={false}
                    isDisabled={!isNewCar}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.color}
                >
                    <span>{formErrors.color}</span>
                </div>
                <DateTimeControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.ServiceDate : SpanishStrings.ServiceDate}
                    onChangeDateTime={handleDateTimeChange}
                    currentValue={serviceRequestInformation.serviceDateString}
                    inputID="serviceDateString"
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.serviceDate}
                >
                    <span>{formErrors.serviceDate}</span>
                </div>
                <h2>{language === "English" ?
                    EnglishStrings.Problem :
                    SpanishStrings.Problem
                }</h2>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Issue : SpanishStrings.Issue}
                    onChangeTextField={handleTextChange}
                    currentValue={serviceRequestInformation.issue}
                    inputID="issue"
                    isExpandable={true}
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.issue}
                >
                    <span>{formErrors.issue}</span>
                </div>
                <h2>{language === "English" ?
                    EnglishStrings.Location :
                    SpanishStrings.Location
                }</h2>
                <div className="mapContainer">
                    <APIProvider apiKey={SECRETS.GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                        <Map
                            mapId={SECRETS.GOOGLE_MAPS_MAP_ID}
                            defaultZoom={11}
                            defaultCenter={{ lat: 40.7330751, lng: -73.2619553 }}
                            disableDefaultUI={true}>
                        </Map>
                        <AdvancedMarker ref={markerRef} position={null} />
                        <MapControl position={ControlPosition.TOP}>
                            <div className="mapAutoCompleteContainer">
                                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                            </div>
                        </MapControl>
                        <MapHandler place={selectedPlace} marker={marker} />
                    </APIProvider>
                </div>
                <div
                    className="errorContainer"
                    hidden={!formErrors.location}
                >
                    <span>{formErrors.location}</span>
                </div>
                <div className="actionButtonsContainer">
                    <button
                        className="submitButton"
                        onClick={submitForm}
                    >
                        {language === "English" ? EnglishStrings.Submit : SpanishStrings.Submit}
                    </button>
                </div>
            </div>
        </div>
    )
}