/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddWorkDone from "../../interfaces/components/work-done/IAddWorkDone";
import checkWorkDoneFormValidity from "../../utilities/CheckWorkDoneFormValidity";
import addWorkDone from "../../services/work-done/AddWorkDone";

export default function AddWorkDone(props: IAddWorkDone) {
    const { language } = props;
    const [workDoneInformation, setWorkDoneInformation] = React.useState<any>({
        workDoneID: 0,
        jobAssignmentID: 0,
        description: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        description: ""
    });
    const [jobAssignmentID, setJobAssignmentID] = React.useState(0);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const jobAssignmentIDQuery = urlParams.get('ID');
        if (!!jobAssignmentIDQuery) {
            setJobAssignmentID(parseInt(jobAssignmentIDQuery));
        }
    }, []);

    const handleTextChange = (event: any) => {
        setWorkDoneInformation({
            ...workDoneInformation,
            [event.target.id]: event.target.value
        });
    }

    const submitForm = async () => {
        setIsLoading(true);
        const workDoneFormValidity = checkWorkDoneFormValidity({
            description: workDoneInformation.description,
            language: language
        });
        if (workDoneFormValidity.doErrorsExist) {
            setFormErrors(workDoneFormValidity.errors);
        }
        else {
            const addWorkDoneResponse = await addWorkDone({
                item: {
                    WorkDoneID: 0,
                    JobAssignmentID: jobAssignmentID,
                    Description: workDoneInformation.description
                }
            });
            if (addWorkDoneResponse.doesErrorExist) {
                setErrorMessage(addWorkDoneResponse.errorMessage);
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
                        <span>{language === "English" ? EnglishStrings.NewWorkDoneSuccess : SpanishStrings.NewWorkDoneSuccess
                    } </span>
                </div>
            }
            <div hidden={isSuccessful || !jobAssignmentID}>
                <h2>{language === "English" ?
                    EnglishStrings.WorkDone :
                    SpanishStrings.WorkDone
                }</h2>
                < TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Description : SpanishStrings.Description}
                    onChangeTextField={handleTextChange}
                    currentValue={workDoneInformation.description}
                    inputID="description"
                    isExpandable={true}
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.description}
                >
                    <span>{formErrors.description} </span>
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