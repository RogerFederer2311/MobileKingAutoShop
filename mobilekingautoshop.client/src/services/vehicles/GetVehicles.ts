
import IVehicle from "../../interfaces/IVehicle";
import IGetVehicles from "../../interfaces/services/vehicles/IGetVehicles";
import { VEHICLES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getVehicles(props: IGetVehicles) {
    const { language } = props;
    console.log(language);
    let vehicles: IVehicle[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${VEHICLES_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                vehicles = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { vehicles, doesErrorExist, errorMessage };
}
