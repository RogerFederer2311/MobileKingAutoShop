/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IUser from "../../interfaces/IUser";
import getUsers from "../../services/users/GetUsers";
import DropdownControl from "../../controls/DropdownControl";
import createChoices from "../../utilities/CreateChoices";
import getJobAssignmentByID from "../../services/job-assignments/GetJobAssignmentByID";
import editJobAssignment from "../../services/job-assignments/EditJobAssignment";
import DateTimeControl from "../../controls/DateTimeControl";
import { JOB_ASSIGNMENT_STATUSES } from "../../Settings";
import IAddServiceRequest from "../../interfaces/components/IAddServiceRequest";

export default function EditServiceRequest(props: IAddServiceRequest) {
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
    const [jobAssignmentID, setJobAssignmentID] = React.useState(0);

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

        async function getJobAssignmentResponse(jobAssignmentID: number) {
            const jobAssignmentByIDResponse = await getJobAssignmentByID({ language: language, id: jobAssignmentID });
            if (!jobAssignmentByIDResponse.doesErrorExist) {
                setJobAssignmentInformation({
                    jobAssignmentID: jobAssignmentID,
                    serviceRequestID: jobAssignmentByIDResponse.jobAssignment.ServiceRequestID,
                    technicianEmail: jobAssignmentByIDResponse.jobAssignment.TechnicianEmail,
                    status: jobAssignmentByIDResponse.jobAssignment.Status,
                    startTime: new Date(jobAssignmentByIDResponse.jobAssignment.StartTime + "Z"),
                    startTimeString: jobAssignmentByIDResponse.jobAssignment.StartTime,
                    endTime: new Date(jobAssignmentByIDResponse.jobAssignment.EndTime + "Z"),
                    endTimeString: jobAssignmentByIDResponse.jobAssignment.EndTime
                });
            }
            else {
                setErrorMessage(jobAssignmentByIDResponse.errorMessage);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const jobAssignmentIDQuery = urlParams.get('ID');
        if (!!jobAssignmentIDQuery) {
            setJobAssignmentID(parseInt(jobAssignmentIDQuery));
            getUsersResponse();
            getJobAssignmentResponse(parseInt(jobAssignmentIDQuery));
        }
    }, []);

    const handleDropdownChange = (event: any) => {
        setJobAssignmentInformation({
            ...jobAssignmentInformation,
            [event.target.id]: event.target.value
        })
    }

    const handleStartDateTimeChange = (event: any) => {
        setJobAssignmentInformation({
            ...jobAssignmentInformation,
            startTimeString: event.target.value,
            startTime: new Date(event.target.value)
        })
    }

    const handleEndDateTimeChange = (event: any) => {
        setJobAssignmentInformation({
            ...jobAssignmentInformation,
            endTimeString: event.target.value,
            endTime: new Date(event.target.value)
        })
    }

    const submitForm = async () => {
        setIsLoading(true);
        setFormErrors({
            technicianEmail: ""
        })
        /*
        const jobAssignmentFormValidity = checkJobAssignmentFormValidity({
            language: language,
            technicianEmail: jobAssignmentInformation.technicianEmail
        });
        if (jobAssignmentFormValidity.doErrorsExist) {
            setFormErrors(jobAssignmentFormValidity.errors);
        }
        else {
        */
        const editJobAssignmentResponse = await editJobAssignment({
            item: {
                JobAssignmentID: jobAssignmentInformation.jobAssignmentID,
                ServiceRequestID: jobAssignmentInformation.serviceRequestID,
                TechnicianEmail: jobAssignmentInformation.technicianEmail,
                Status: jobAssignmentInformation.status,
                StartTime: jobAssignmentInformation.startTime,
                EndTime: jobAssignmentInformation.endTime
            }
        });
        if (editJobAssignmentResponse.doesErrorExist) {
            setErrorMessage(editJobAssignmentResponse.errorMessage);
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
                    <span>{language === "English" ? EnglishStrings.EditJobAssignmentSuccess : SpanishStrings.EditJobAssignmentSuccess
                    } </span>
                </div>
            }
            <div hidden={!jobAssignmentID}>
                <h2>{language === "English" ?
                    EnglishStrings.JobAssignment :
                    SpanishStrings.JobAssignment
                }</h2>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={jobAssignmentInformation.technicianEmail}
                    dropdownOptions={createChoices({
                        items: technicians,
                        labelProperty: "Email",
                        valueProperty: "Email"
                    })}
                    inputID="technicianEmail"
                    isDisabled={true}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.technicianEmail}
                >
                    <span>{formErrors.technicianEmail} </span>
                </div>
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={jobAssignmentInformation.technicianEmail}
                    dropdownOptions={createChoices({
                        items: JOB_ASSIGNMENT_STATUSES,
                        labelProperty: "value",
                        valueProperty: "value"
                    })}
                    inputID="technicianEmail"
                    isDisabled={true}
                />
                <DateTimeControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.StartTime : SpanishStrings.StartTime}
                    onChangeDateTime={handleStartDateTimeChange}
                    currentValue={jobAssignmentInformation.startTimeString}
                    inputID="startTimeString"
                    isDisabled={false}
                />
                <DateTimeControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.EndTime : SpanishStrings.EndTime}
                    onChangeDateTime={handleEndDateTimeChange}
                    currentValue={jobAssignmentInformation.endTimeString}
                    inputID="endTimeString"
                    isDisabled={false}
                />
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