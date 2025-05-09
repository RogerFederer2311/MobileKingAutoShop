/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddWorkDone from "../../interfaces/components/work-done/IAddWorkDone";
import getTechnicianSpecialties from "../../services/technician-specialties/GetTechnicianSpecialties";
import deleteTechnicianSpecialty from "../../services/technician-specialties/DeleteTechnicianSpecialty";
import editTechnicianSpecialty from "../../services/technician-specialties/EditTechnicianSpecialty";

export default function EditTechnicianSpecialty(props: IAddWorkDone) {
    const { language } = props;
    const [technicianSpecialtyInformation, setTechnicianSpecialtyInformation] = React.useState<any>({
        specialtyID: 0,
        technicianEmail: "",
        specialty: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [specialtyID, setSpecialtyID] = React.useState(0);

    React.useEffect(() => {
        async function getTechnicianSpecialtyResponse(specialtyID: number) {
            const technicianSpecialtyResponse = await getTechnicianSpecialties({ language: language });
            if (!technicianSpecialtyResponse.doesErrorExist) {
                const loadedSpecialty = technicianSpecialtyResponse.technicianSpecialties.filter(specialty => specialty.SpecialtyID === specialtyID)[0];
                setTechnicianSpecialtyInformation({
                    specialtyID: specialtyID,
                    technicianEmail: loadedSpecialty.TechnicianEmail,
                    specialty: loadedSpecialty.Specialty
                });
            }
            else {
                setErrorMessage(technicianSpecialtyResponse.errorMessage);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const specialtyIDQuery = urlParams.get('ID');
        if (!!specialtyIDQuery) {
            setSpecialtyID(parseInt(specialtyIDQuery));
            getTechnicianSpecialtyResponse(parseInt(specialtyIDQuery));
        }
    }, []);

    const handleTextChange = (event: any) => {
        setTechnicianSpecialtyInformation({
            ...technicianSpecialtyInformation,
            [event.target.id]: event.target.value
        });
    }

    const deleteItem = async () => {
        setIsLoading(true);
        const deleteTechnicianSpecialtyResponse = await deleteTechnicianSpecialty({ id: specialtyID });
        if (deleteTechnicianSpecialtyResponse.doesErrorExist) {
            setErrorMessage(deleteTechnicianSpecialtyResponse.errorMessage);
        }
        else {
            setErrorMessage("");
            setIsSuccessful(true);
        }
        setIsLoading(false);
    }

    const submitForm = async () => {
        setIsLoading(true);
        const editTechnicianSpecialtyResponse = await editTechnicianSpecialty({
            item: {
                SpecialtyID: specialtyID,
                TechnicianEmail: technicianSpecialtyInformation.technicianEmail,
                Specialty: technicianSpecialtyInformation.specialty
            }
        });
        if (editTechnicianSpecialtyResponse.doesErrorExist) {
            setErrorMessage(editTechnicianSpecialtyResponse.errorMessage);
        }
        else {
            setErrorMessage("");
            setIsSuccessful(true);
        }
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
                    <span>{language === "English" ? EnglishStrings.EditTechnicianSpecialtySuccess : SpanishStrings.EditTechnicianSpecialtySuccess
                    } </span>
                </div>
            }
            <div hidden={!specialtyID || isSuccessful || !!errorMessage}>
                <h2>{language === "English" ?
                    EnglishStrings.Specialty :
                    SpanishStrings.Specialty
                }</h2>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Technician : SpanishStrings.Technician}
                    onChangeTextField={handleTextChange}
                    currentValue={technicianSpecialtyInformation.technicianEmail}
                    inputID="technicianEmail"
                    isExpandable={true}
                    isDisabled={true}
                   />
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Specialty : SpanishStrings.Specialty}
                    onChangeTextField={handleTextChange}
                    currentValue={technicianSpecialtyInformation.specialty}
                    inputID="specialty"
                    isExpandable={true}
                    isDisabled={false}
                />
                <div className="actionButtonsContainer" >
                    <button
                        className="cancelButton"
                        onClick={deleteItem}
                    >
                        {language === "English" ? EnglishStrings.Delete : SpanishStrings.Delete}
                    </button>
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