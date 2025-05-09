import IUser from "../../interfaces/IUser";
import IGetUserByEmail from "../../interfaces/services/users/IGetUserByEmail";
import { USERS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getUserByEmail(props: IGetUserByEmail) {
    const { language, email } = props;
    let user: IUser = {
        Email: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Gender: "",
        OtherGender: "",
        Password: "",
        Role: "",
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: "",
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${USERS_URI}/by-email/${email}`)
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
    if (user.Email === "" && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoUser : SpanishStrings.NoUser;
    }
    return { user, doesErrorExist, errorMessage };
}
