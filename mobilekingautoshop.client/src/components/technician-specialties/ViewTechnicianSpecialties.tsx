/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import EnglishStrings from '../../strings/EnglishStrings';
import SpanishStrings from '../../strings/SpanishStrings';
import getCookie from '../../utilities/GetCookie';
import IViewWorkDone from '../../interfaces/components/work-done/IViewWorkDone';
import getTechnicianSpecialties from '../../services/technician-specialties/GetTechnicianSpecialties';
import ITechnicianSpecialty from '../../interfaces/ITechnicianSpecialty';
import newWindow from "../../images/newWindow.svg";

export default function ViewTechnicianSpecialties(props: IViewWorkDone) {
    const { language } = props;
    const [technicianSpecialties, setTechnicianSpecialties] = useState<ITechnicianSpecialty[]>([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [role, setRole] = React.useState("");

    useEffect(() => {
        async function getTechnicianSpecialtiesResponse() {
            const technicianSpecialtiesResponse = await getTechnicianSpecialties({ language: language });

            if (!technicianSpecialtiesResponse.doesErrorExist) {
                setIsSuccessful(true);
                const receivedRole = getCookie("role");
                setRole(receivedRole);
                setTechnicianSpecialties(technicianSpecialtiesResponse.technicianSpecialties);
            }
            else {
                setErrorMessage(language ? EnglishStrings.NoDataLoaded : SpanishStrings.NoDataLoaded);
            }
            setIsLoading(false);
        }

        getTechnicianSpecialtiesResponse();
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
                    EnglishStrings.TechnicianSpecialty :
                    SpanishStrings.TechnicianSpecialty
                }</h2>
                <div>
                    <a href="/service-requests/add">
                        {language === "English" ? EnglishStrings.AddTechnicianSpecialty : SpanishStrings.AddTechnicianSpecialty}
                    </a>
                </div>
                <div className="tableContainer" hidden={!isSuccessful}>
                    {role === "Admin" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Edit : SpanishStrings.Edit}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Technician : SpanishStrings.Technician}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Specialty : SpanishStrings.Specialty}
                                </th>
                            </tr>
                            {technicianSpecialties.map((technicianSpecialty) => {
                                return (
                                    <tr>
                                        <td><a href={`/technician-specialties/edit?ID=${technicianSpecialty.SpecialtyID}`}><img src={newWindow} /></a></td>
                                        <td>{technicianSpecialty.TechnicianEmail}</td>
                                        <td>{technicianSpecialty.Specialty}</td>
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
