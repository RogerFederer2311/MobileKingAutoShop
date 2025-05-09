/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import ILogin from "../../interfaces/components/ILogin";
import React from "react";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import checkLoginFormValidity from "../../utilities/CheckLoginFormValidity";
import loginUser from "../../services/users/LoginUser";
import setCookie from "../../utilities/SetCookie";

export default function Login(props: ILogin) {
    const {
        language
    } = props;
    const [loginInformation, setLoginInformation] = React.useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        email: "",
        password: ""
    });

    const handleTextChange = (event: any) => {
        setLoginInformation({
            ...loginInformation,
            [event.target.id]: event.target.value
        });
    }

    const submitForm = async () => {
        setIsLoading(true);
        const loginFormValidity = checkLoginFormValidity({
            email: loginInformation.email,
            password: loginInformation.password,
            language: language
        });
        if (loginFormValidity.doErrorsExist) {
            setFormErrors(loginFormValidity.errors);
        }
        else {
            const loginUserResponse = await loginUser({
                email: loginInformation.email,
                password: loginInformation.password,
                language: language
            });
            if (loginUserResponse.doesErrorExist) {
                setErrorMessage(loginUserResponse.errorMessage);
            }
            else {
                setErrorMessage("");
                setIsSuccessful(true);
                setCookie("email", loginUserResponse.user.Email, 60);
                setCookie("role", loginUserResponse.user.Role, 60);
                setCookie("firstName", loginUserResponse.user.FirstName, 60);
                const urlParams = new URLSearchParams(window.location.search);
                const sourceURL = urlParams.get('sourceURL');
                if (!!sourceURL) {
                    window.open(sourceURL, "_self");
                }
                else {
                    window.open("/", "_self");
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer">
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading}</span>
                </div>
            }
            {!!errorMessage &&
                <div className="errorContainer">
                    <span>{errorMessage}</span>
                </div>
            }
            <div hidden={isSuccessful}>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Email : SpanishStrings.Email}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.email}
                    inputID="email"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.email}
                >
                    <span>{formErrors.email}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Password : SpanishStrings.Password}
                    onChangeTextField={handleTextChange}
                    currentValue={loginInformation.password}
                    inputID="password"
                    isExpandable={false}
                    isDisabled={false}
                    isPassword={true}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.password}
                >
                    <span>{formErrors.password}</span>
                </div>
                <div className="linksContainer">
                    <a href="/forgot-password">{language === "English" ?
                        EnglishStrings.ForgotPassword : SpanishStrings.ForgotPassword}</a>
                    <a href="/create-account">{language === "English" ?
                        EnglishStrings.CreateAccount : SpanishStrings.CreateAccount}</a>
                </div>
                <div className="actionButtonsContainer">
                    <button
                        className="submitButton"
                        onClick={submitForm}
                    >
                        {language === "English" ? EnglishStrings.Submit : SpanishStrings.Submit}
                    </button>
                </div>
            </div>
        </div>
    );
}