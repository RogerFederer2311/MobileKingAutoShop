/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import EnglishStrings from '../../strings/EnglishStrings';
import SpanishStrings from '../../strings/SpanishStrings';
import getCookie from '../../utilities/GetCookie';
import IViewWorkDone from '../../interfaces/components/work-done/IViewWorkDone';
import IWorkDone from '../../interfaces/IWorkDone';
import getWorkDone from '../../services/work-done/GetWorkDone';
import newWindow from "../../images/newWindow.svg";

export default function ViewWorkDone(props: IViewWorkDone) {
    const { language } = props;
    const [workDone, setWorkDone] = useState<IWorkDone[]>([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [role, setRole] = React.useState("");
    const [jobAssignmentID, setJobAssignmentID] = React.useState(0);

    useEffect(() => {
        async function getWorkDoneResponse(jobAssignmentID: number) {
            const workDoneResponse = await getWorkDone({ language: language });

            if (!workDoneResponse.doesErrorExist) {
                const loadedWorkDone = workDoneResponse.workDone.filter(workDone => workDone.JobAssignmentID === jobAssignmentID);
                const receivedRole = getCookie("role");
                setRole(receivedRole);
                setWorkDone(loadedWorkDone);
                setIsSuccessful(true);
            }
            else {
                setErrorMessage(language ? EnglishStrings.NoDataLoaded : SpanishStrings.NoDataLoaded);
            }
            setIsLoading(false);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const jobAssignmentIDQuery = urlParams.get('ID');
        if (!!jobAssignmentIDQuery) {
            getWorkDoneResponse(parseInt(jobAssignmentIDQuery));
            setJobAssignmentID(parseInt(jobAssignmentIDQuery));
        }
    }, []);

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer">
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading}</span>
                </div>
            }
            {
                !!errorMessage &&
                <div className="errorContainer">
                    <span>{errorMessage}</span>
                </div>
            }
            <div>
                <h2>{language === "English" ?
                    EnglishStrings.WorkDone :
                    SpanishStrings.WorkDone
                }</h2>
                {role !== "Customer" &&
                    <div>
                        <a href={`/work-done/add?ID=${jobAssignmentID}`}>
                            {language === "English" ? EnglishStrings.AddWorkDone : SpanishStrings.AddWorkDone}
                        </a>
                    </div>
                }
                <div className="tableContainer" hidden={!isSuccessful}>
                    {role === "Customer" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Description : SpanishStrings.Description}
                                </th>
                            </tr>
                            {workDone.map((workDone) => {
                                return (
                                    <tr>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (workDone.Description).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    }
                    {role !== "Customer" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Edit : SpanishStrings.Edit}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Description : SpanishStrings.Description}
                                </th>
                            </tr>
                            {workDone.map((workDone) => {
                                return (
                                    <tr>
                                        <td><a href={`/work-done/edit?ID=${workDone.WorkDoneID}`}><img src={newWindow} /></a></td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (workDone.Description).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    }
                </div>
            </div>
        </div>
    );
}
