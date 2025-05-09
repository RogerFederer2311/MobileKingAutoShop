/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddWorkDone from "../../interfaces/components/work-done/IAddWorkDone";
import checkWorkDoneFormValidity from "../../utilities/CheckWorkDoneFormValidity";
import getWorkDoneByID from "../../services/work-done/GetWorkDoneByID";
import editWorkDone from "../../services/work-done/EditWorkDone";
import deleteWorkDone from "../../services/work-done/DeleteWorkDone";

export default function EditWorkDone(props: IAddWorkDone) {
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
    const [workDoneID, setWorkDoneID] = React.useState(0);

    React.useEffect(() => {
        async function getWorkDoneResponse(workDoneID: number) {
            const workDoneByIDResponse = await getWorkDoneByID({ language: language, id: workDoneID });
            if (!workDoneByIDResponse.doesErrorExist) {
                setWorkDoneInformation({
                    workDoneID: workDoneID,
                    jobAssignmentID: workDoneByIDResponse.workDone.JobAssignmentID,
                    description: workDoneByIDResponse.workDone.Description
                });
            }
            else {
                setErrorMessage(workDoneByIDResponse.errorMessage);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const workDoneIDQuery = urlParams.get('ID');
        if (!!workDoneIDQuery) {
            setWorkDoneID(parseInt(workDoneIDQuery));
            getWorkDoneResponse(parseInt(workDoneIDQuery));
        }
    }, []);

    const handleTextChange = (event: any) => {
        setWorkDoneInformation({
            ...workDoneInformation,
            [event.target.id]: event.target.value
        });
    }

    const deleteItem = async () => {
        setIsLoading(true);
        const deleteWorkDoneResponse = await deleteWorkDone({ id: workDoneID });
        if (deleteWorkDoneResponse.doesErrorExist) {
            setErrorMessage(deleteWorkDoneResponse.errorMessage);
        }
        else {
            setErrorMessage("");
            setIsSuccessful(true);
        }
        setIsLoading(false);
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
            const editWorkDoneResponse = await editWorkDone({
                item: {
                    WorkDoneID: workDoneInformation.workDoneID,
                    JobAssignmentID: workDoneInformation.jobAssignmentID,
                    Description: workDoneInformation.description
                }
            });
            if (editWorkDoneResponse.doesErrorExist) {
                setErrorMessage(editWorkDoneResponse.errorMessage);
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
                    <span>{language === "English" ? EnglishStrings.EditWorkDoneSuccess : SpanishStrings.EditWorkDoneSuccess
                    } </span>
                </div>
            }
            <div hidden={!workDoneID || !!errorMessage || isSuccessful}>
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