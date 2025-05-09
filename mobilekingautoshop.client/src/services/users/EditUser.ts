import IEditUser from "../../interfaces/services/users/IEditUser";
import { USERS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editUser(props: IEditUser) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${USERS_URI}/edit/${item.Email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { doesErrorExist, errorMessage };
}