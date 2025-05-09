import IUser from "../../interfaces/IUser";
import ILoginUser from "../../interfaces/services/users/ILoginUser";
import { USERS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function loginUser(props: ILoginUser) {
    const { language, email, password } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    let user: IUser = {
        Email: "",
        Password: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Role: "",
        Gender: "",
        OtherGender: "",
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: ""
    };
    await fetch(`${USERS_URI}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Email: email,
            Password: password
        })
    })
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                user = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (!user.Email) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoUser : SpanishStrings.NoUser;
    }
    return { user, doesErrorExist, errorMessage };
}