/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import EnglishStrings from '../../strings/EnglishStrings';
import SpanishStrings from '../../strings/SpanishStrings';
import getCookie from '../../utilities/GetCookie';
import ICreateAccount from '../../interfaces/components/ICreateAccount';
import IUser from '../../interfaces/IUser';
import getUsers from '../../services/users/GetUsers';
import newWindow from "../../images/newWindow.svg";

export default function ViewUsers(props: ICreateAccount) {
    const { language } = props;
    const [users, setUsers] = useState<IUser[]>([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [role, setRole] = React.useState("");

    useEffect(() => {
        async function getUsersResponse() {
            const usersResponse = await getUsers({ language: language });

            if (!usersResponse.doesErrorExist) {
                setIsSuccessful(true);
                const receivedRole = getCookie("role");
                setRole(receivedRole);
                setUsers(usersResponse.users);
            }
            else {
                setErrorMessage(language ? EnglishStrings.NoDataLoaded : SpanishStrings.NoDataLoaded);
            }
            setIsLoading(false);
        }

        getUsersResponse();
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
                    EnglishStrings.Users :
                    SpanishStrings.Users
                }</h2>
                <div className="tableContainer" hidden={!isSuccessful}>
                    {role === "Admin" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Edit : SpanishStrings.Edit}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Email : SpanishStrings.Email}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.FirstName : SpanishStrings.FirstName}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.LastName : SpanishStrings.LastName}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Role : SpanishStrings.Role}
                                </th>
                            </tr>
                            {users.map((user) => {
                                return (
                                    <tr>
                                        <td><a href={`/users/edit?ID=${user.Email}`}><img src={newWindow} /></a></td>
                                        <td>{user.Email}</td>
                                        <td>{user.FirstName}</td>
                                        <td>{user.LastName}</td>
                                        <td>{user.Role}</td>
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
