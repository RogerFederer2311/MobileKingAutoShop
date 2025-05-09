
import INotification from "../../interfaces/INotification";
import IGetNotifications from "../../interfaces/services/notifications/IGetNotifications";
import { NOTIFICATIONS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getNotifications(props: IGetNotifications) {
    const { language } = props;
    console.log(language);
    let notifications: INotification[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${NOTIFICATIONS_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                notifications = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { notifications, doesErrorExist, errorMessage };
}
