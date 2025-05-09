/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddJobAssignment from "../../interfaces/components/job-assignments/IAddJobAssignment";
import checkJobAssignmentFormValidity from "../../utilities/CheckJobAssignmentFormValidity";
import addJobAssignment from "../../services/job-assignments/AddJobAssignment";
import IUser from "../../interfaces/IUser";
import getUsers from "../../services/users/GetUsers";
import DropdownControl from "../../controls/DropdownControl";
import createChoices from "../../utilities/CreateChoices";

export default function AddJobAssignment(props: IAddJobAssignment) {
    const { language } = props;
    const [jobAssignmentInformation, setJobAssignmentInformation] = React.useState<any>({
        jobAssignmentID: 0,
        serviceRequestID: 0,
        technicianEmail: "",
        status: "",
        startTime: new Date(),
        startTimeString: "",
        endTime: new Date(),
        endTimeString: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [technicians, setTechnicians] = React.useState<IUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        technicianEmail: ""
    });
    const [serviceRequestID, setServiceRequestID] = React.useState(0);

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

        const urlParams = new URLSearchParams(window.location.search);
        const serviceRequestIDQuery = urlParams.get('ID');
        if (!!serviceRequestIDQuery) {
            setServiceRequestID(parseInt(serviceRequestIDQuery));
            getUsersResponse();
        }
    }, []);

    const handleDropdownChange = (event: any) => {
        setJobAssignmentInformation({
            ...jobAssignmentInformation,
            [event.target.id]: event.target.value
        })
    }

    const submitForm = async () => {
        setIsLoading(true);
        const jobAssignmentFormValidity = checkJobAssignmentFormValidity({
            language: language,
            technicianEmail: jobAssignmentInformation.technicianEmail
        });
        if (jobAssignmentFormValidity.doErrorsExist) {
            setFormErrors(jobAssignmentFormValidity.errors);
        }
        else {
            const addJobAssignmentResponse = await addJobAssignment({
                item: {
                    JobAssignmentID: 0,
                    ServiceRequestID: serviceRequestID,
                    TechnicianEmail: jobAssignmentInformation.technicianEmail,
                    Status: "Pending",
                    StartTime: null,
                    EndTime: null
                }
            });
            if (addJobAssignmentResponse.doesErrorExist) {
                setErrorMessage(addJobAssignmentResponse.errorMessage);
            }
            else {
                setErrorMessage("");
                setIsSuccessful(true);
            }
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
                    <span>{language === "English" ? EnglishStrings.NewJobAssignmentSuccess : SpanishStrings.NewJobAssignmentSuccess
                    } </span>
                </div>
            }
            <div hidden={isSuccessful || !serviceRequestID}>
                <h2>{language === "English" ?
                    EnglishStrings.JobAssignment :
                    SpanishStrings.JobAssignment
                }</h2>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Technician : SpanishStrings.Technician}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={jobAssignmentInformation.technicianEmail}
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