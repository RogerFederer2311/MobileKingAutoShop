import IUser from "../../interfaces/IUser";
import IGetUsers from "../../interfaces/services/users/IGetUsers";
import { USERS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getUsers(props: IGetUsers) {
    const { language } = props;
    console.log(language);
    let users: IUser[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${USERS_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                users = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { users, doesErrorExist, errorMessage };
}
