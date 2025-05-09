
import INotification from "../../interfaces/INotification";
import IGetNotificationsByEmail from "../../interfaces/services/notifications/IGetNotificationsByEmail";
import { NOTIFICATIONS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getNotificationsByEmail(props: IGetNotificationsByEmail) {
    const { language, email } = props;
    let notifications: INotification[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${NOTIFICATIONS_URI}/by-email/${email}`)
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
    if (notifications.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoNotifications : SpanishStrings.NoNotifications;
    }
    return { notifications, doesErrorExist, errorMessage };
}
