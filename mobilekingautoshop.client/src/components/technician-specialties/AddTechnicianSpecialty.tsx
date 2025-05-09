/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddWorkDone from "../../interfaces/components/work-done/IAddWorkDone";
import addTechnicianSpecialty from "../../services/technician-specialties/AddTechnicianSpecialty";
import DropdownControl from "../../controls/DropdownControl";
import createChoices from "../../utilities/CreateChoices";
import IUser from "../../interfaces/IUser";
import getUsers from "../../services/users/GetUsers";

export default function AddTechnicianSpecialty(props: IAddWorkDone) {
    const { language } = props;
    const [technicianSpecialtyInformation, setTechnicianSpecialtyInformation] = React.useState<any>({
        specialtyID: 0,
        technicianEmail: "",
        specialty: "",
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [technicians, setTechnicians] = React.useState<IUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        technicianEmail: "",
        specialty: "",
    });

    React.useEffect(() => {
        async function getUsersResponse() {
            const usersResponse = await getUsers({ language: language });
            if (!usersResponse.doesErrorExist) {
                const loadedTechnicians = usersResponse.users.filter(user => user.Role === "Technician");
                setTechnicians(loadedTechnicians);
            }
            else {
                setErrorMessage(usersResponse.errorMessage);
            }
        }
        getUsersResponse();
    }, []);

    const handleTextChange = (event: any) => {
        setTechnicianSpecialtyInformation({
            ...technicianSpecialtyInformation,
            [event.target.id]: event.target.value
        });
    }

    const handleTechnicianChange = (event: any) => {
        setTechnicianSpecialtyInformation({
            ...technicianSpecialtyInformation,
            [event.target.id]: event.target.value
        });
    }

    const submitForm = async () => {
        setIsLoading(true);
        setFormErrors({
            technicianEmail: "",
            specialty: ""
        });
        /*
        const workDoneFormValidity = checkWorkDoneFormValidity({
            description: workDoneInformation.description,
            language: language
        });
        if (workDoneFormValidity.doErrorsExist) {
            setFormErrors(workDoneFormValidity.errors);
        }
        else {
        */
        const addTechnicianSpecialtyResponse = await addTechnicianSpecialty({
            item: {
                SpecialtyID: 0,
                TechnicianEmail: technicianSpecialtyInformation.technicianEmail,
                Specialty: technicianSpecialtyInformation.specialty
            }
        });
        if (addTechnicianSpecialtyResponse.doesErrorExist) {
            setErrorMessage(addTechnicianSpecialtyResponse.errorMessage);
        }
        else {
            setErrorMessage("");
            setIsSuccessful(true);
        }
        //}
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer" >
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading}</span>
                </div>
            }
            {
                !!errorMessage &&
                <div className="errorContainer" >
                    <span>{errorMessage} </span>
                </div>
            }
            {
                isSuccessful &&
                <div className="successContainer" >
                    <span>{language === "English" ? EnglishStrings.NewTechnicianSpecialty : SpanishStrings.NewTechnicianSpecialty
                    } </span>
                </div>
            }
            <div hidden={isSuccessful}>
                <h2>{language === "English" ?
                    EnglishStrings.TechnicianSpecialty :
                    SpanishStrings.TechnicianSpecialty
                }</h2>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Technician : SpanishStrings.Technician}
                    onChangeDropdown={handleTechnicianChange}
                    currentValue={technicianSpecialtyInformation.technicianEmail}
                    dropdownOptions={createChoices({
                        items: technicians,
                        labelProperty: "Email",
                        valueProperty: "Email"
                    })}
                    inputID="technicianEmail"
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.technicianEmail}
                >
                    <span>{formErrors.technicianEmail} </span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Specialty : SpanishStrings.Specialty}
                    onChangeTextField={handleTextChange}
                    currentValue={technicianSpecialtyInformation.specialty}
                    inputID="specialty"
                    isExpandable={true}
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.specialty}
                >
                    <span>{formErrors.specialty} </span>
                </div>
                < div className="actionButtonsContainer" >
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