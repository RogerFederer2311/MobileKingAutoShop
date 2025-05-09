/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import React from "react";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import ICreateAccount from "../../interfaces/components/ICreateAccount";
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    MapControl,
    useMap,
    useAdvancedMarkerRef,
    useMapsLibrary,
    AdvancedMarker,
    ControlPosition
} from '@vis.gl/react-google-maps';
import SECRETS from "../../Secrets";
import checkAccountFormValidity from "../../utilities/CheckAccountFormValidity";
import addUser from "../../services/users/AddUser";
import { GENDERS } from "../../Settings";
import DropdownControl from "../../controls/DropdownControl";
import createChoices from "../../utilities/CreateChoices";

export default function CreateAccount(props: ICreateAccount) {
    const {
        language
    } = props;
    const [loginInformation, setLoginInformation] = React.useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        otherGender: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        country: ""
    });
    const [formErrors, setFormErrors] = React.useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        otherGender: "",
        phoneNumber: "",
        location: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [selectedPlace, setSelectedPlace] =
        React.useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const handleTextChange = (event: any) => {
        setLoginInformation({
            ...loginInformation,
            [event.target.id]: event.target.value
        });
    }

    const handleDropdownChange = (event: any) => {
        setLoginInformation({
            ...loginInformation,
            [event.target.id]: event.target.value
        });
    }

    const submitForm = async () => {
        setIsLoading(true);
        const accountFormValidity = checkAccountFormValidity({
            email: loginInformation.email,
            password: loginInformation.password,
            confirmEmail: loginInformation.confirmEmail,
            confirmPassword: loginInformation.confirmPassword,
            firstName: loginInformation.firstName,
            lastName: loginInformation.lastName,
            gender: loginInformation.gender,
            otherGender: loginInformation.otherGender,
            phoneNumber: loginInformation.phoneNumber,
            address: loginInformation.address,
            language: language
        });
        if (accountFormValidity.doErrorsExist) {
            setFormErrors(accountFormValidity.errors);
        }
        else {
            const addUserResponse = await addUser({
                item: {
                    Email: loginInformation.email,
                    FirstName: loginInformation.firstName,
                    LastName: loginInformation.lastName,
                    PhoneNumber: loginInformation.phoneNumber,
                    Gender: loginInformation.gender,
                    OtherGender: loginInformation.otherGender,
                    Password: loginInformation.password,
                    Role: "Customer",
                    Address: loginInformation.address,
                    City: loginInformation.city,
                    State: loginInformation.state,
                    ZipCode: loginInformation.zipCode,
                    Country: loginInformation.country
                }
            });
            if (addUserResponse.doesErrorExist) {
                setErrorMessage(addUserResponse.errorMessage);
            }
            else {
                setErrorMessage("");
                setIsSuccessful(true);
            }
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        console.log(loginInformation);
    }, [loginInformation])

    React.useEffect(() => {
        if (!selectedPlace || !selectedPlace.address_components) return;
        console.log(selectedPlace);
        setLoginInformation({
            ...loginInformation,
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
                    <span>{language === "English" ?
                        EnglishStrings.NewAccountSuccess :
                        SpanishStrings.NewAccountSuccess}</span>
                </div>
            }
            <h2>{language === "English" ?
                EnglishStrings.PersonalInformation :
                SpanishStrings.PersonalInformation
            }</h2>
            <div hidden={isSuccessful}>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.FirstName : SpanishStrings.FirstName}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.firstName}
                    inputID="firstName"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.firstName}
                    className="errorContainer"
                >
                    <span>{formErrors.firstName}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.LastName : SpanishStrings.LastName}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.lastName}
                    inputID="lastName"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.lastName}
                    className="errorContainer"
                >
                    <span>{formErrors.lastName}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.PhoneNumber : SpanishStrings.PhoneNumber}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.phoneNumber}
                    inputID="phoneNumber"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.phoneNumber}
                    className="errorContainer"
                >
                    <span>{formErrors.phoneNumber}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Email : SpanishStrings.Email}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.email}
                    inputID="email"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.email}
                    className="errorContainer"
                >
                    <span>{formErrors.email}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.ConfirmEmail : SpanishStrings.ConfirmEmail}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.confirmEmail}
                    inputID="confirmEmail"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.confirmEmail}
                    className="errorContainer"
                >
                    <span>{formErrors.confirmEmail}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Password : SpanishStrings.Password}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.password}
                    inputID="password"
                    isExpandable={false}
                    isDisabled={false}
                    isPassword={true}
                />
                <div
                    hidden={!formErrors.password}
                    className="errorContainer"
                >
                    <span>{formErrors.password}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.ConfirmPassword : SpanishStrings.ConfirmPassword}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.confirmPassword}
                    inputID="confirmPassword"
                    isExpandable={false}
                    isDisabled={false}
                    isPassword={true}
                />
                <div
                    hidden={!formErrors.confirmPassword}
                    className="errorContainer"
                >
                    <span>{formErrors.confirmPassword}</span>
                </div>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Gender : SpanishStrings.Gender}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={loginInformation.gender}
                    dropdownOptions={createChoices({
                        items: GENDERS,
                        labelProperty: "value",
                        valueProperty: "value"
                    })}
                    inputID="gender"
                    isDisabled={false}
                />
                <div
                    hidden={!formErrors.gender}
                    className="errorContainer"
                >
                    <span>{formErrors.gender}</span>
                </div>
                {loginInformation.gender === "Other" &&
                    <React.Fragment>
                        <TextFieldControl
                            fieldLabel={language === "English" ?
                                EnglishStrings.OtherGender : SpanishStrings.OtherGender}
                            onChangeTextField={handleTextChange}
                            currentValue={loginInformation.otherGender}
                            inputID="otherGender"
                            isDisabled={false}
                        />
                        <div
                            hidden={!formErrors.otherGender}
                            className="errorContainer"
                        >
                            <span>{formErrors.otherGender}</span>
                        </div>
                    </React.Fragment>
                }
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
                            disableDefaultUI={true}
                            onCameraChanged={(ev: MapCameraChangedEvent) =>
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }>
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
                    hidden={!formErrors.location}
                    className="errorContainer"
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
    );
}