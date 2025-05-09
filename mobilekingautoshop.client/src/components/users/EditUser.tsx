/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import ICreateAccount from "../../interfaces/components/ICreateAccount";
import getUserByEmail from "../../services/users/GetUserByEmail";
import editUser from "../../services/users/EditUser";
import DropdownControl from "../../controls/DropdownControl";
import { ROLES } from "../../Settings";
import createChoices from "../../utilities/CreateChoices";

export default function EditUser(props: ICreateAccount) {
    const { language } = props;
    const [userInformation, setUserInformation] = React.useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        gender: "",
        otherGender: "",
        password: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");

    React.useEffect(() => {
        async function getUserResponse(userEmail: string) {
            const userByEmailResponse = await getUserByEmail({ language: language, email: userEmail });
            if (!userByEmailResponse.doesErrorExist) {
                setUserInformation({
                    email: userEmail,
                    firstName: userByEmailResponse.user.FirstName,
                    lastName: userByEmailResponse.user.LastName,
                    phoneNumber: userByEmailResponse.user.PhoneNumber,
                    role: userByEmailResponse.user.Role,
                    gender: userByEmailResponse.user.Gender,
                    otherGender: userByEmailResponse.user.OtherGender,
                    password: userByEmailResponse.user.Password,
                    address: userByEmailResponse.user.Address,
                    city: userByEmailResponse.user.City,
                    state: userByEmailResponse.user.State,
                    zipCode: userByEmailResponse.user.ZipCode,
                    country: userByEmailResponse.user.Country
                });
            }
            else {
                setErrorMessage(userByEmailResponse.errorMessage);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const userEmailQuery = urlParams.get('ID');
        if (!!userEmailQuery) {
            setUserEmail(userEmailQuery);
            getUserResponse(userEmailQuery);
        }
    }, []);

    const handleTextChange = (event: any) => {
        setUserInformation({
            ...userInformation,
            [event.target.id]: event.target.value
        });
    }

    const handleDropdownChange = (event: any) => {
        setUserInformation({
            ...userInformation,
            [event.target.id]: event.target.value
        });
    }

    const submitForm = async () => {
        setIsLoading(true);
        const editUserResponse = await editUser({
            item: {
                Email: userInformation.email,
                FirstName: userInformation.firstName,
                LastName: userInformation.lastName,
                PhoneNumber: userInformation.phoneNumber,
                Gender: userInformation.gender,
                OtherGender: userInformation.otherGender,
                Password: "",
                Role: userInformation.role,
                Address: userInformation.address,
                City: userInformation.city,
                State: userInformation.state,
                ZipCode: userInformation.zipCode,
                Country: userInformation.country
            }
        });
        if (editUserResponse.doesErrorExist) {
            setErrorMessage(editUserResponse.errorMessage);
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
                <div className="errorContainer">
                    <span>{errorMessage}</span>
                </div>
            }
            {
                isSuccessful &&
                <div className="successContainer">
                    <span>{language === "English" ? EnglishStrings.EditUserSuccess : SpanishStrings.EditUserSuccess
                    } </span>
                </div>
            }
            <div hidden={!userEmail}>
                <h2>{language === "English" ?
                    EnglishStrings.User :
                    SpanishStrings.User
                }</h2>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Email : SpanishStrings.Email}
                    onChangeTextField={handleTextChange}
                    currentValue={userInformation.email}
                    inputID="email"
                    isExpandable={false}
                    isDisabled={true}
                />
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.FirstName : SpanishStrings.FirstName}
                    onChangeTextField={handleTextChange}
                    currentValue={userInformation.firstName}
                    inputID="firstName"
                    isExpandable={false}
                    isDisabled={false}
                />
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.LastName : SpanishStrings.LastName}
                    onChangeTextField={handleTextChange}
                    currentValue={userInformation.lastName}
                    inputID="lastName"
                    isExpandable={false}
                    isDisabled={false}
                />
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.PhoneNumber : SpanishStrings.PhoneNumber}
                    onChangeTextField={handleTextChange}
                    currentValue={userInformation.phoneNumber}
                    inputID="phoneNumber"
                    isExpandable={false}
                    isDisabled={false}
                />
                <DropdownControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Role : SpanishStrings.Role}
                    onChangeDropdown={handleDropdownChange}
                    currentValue={userInformation.role}
                    dropdownOptions={createChoices({
                        items: ROLES,
                        labelProperty: "value",
                        valueProperty: "value"
                    })}
                    inputID="role"
                    isDisabled={false}
                />
                <div className="actionButtonsContainer" >
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