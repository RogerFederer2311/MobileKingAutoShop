export default function convertDateTimeISO(date: Date) {
    if (!date) {
        return "";
    }

    let dateTimeString = "";
    const month = date.getMonth() + 1;
    dateTimeString = `${date.getFullYear()}-${month < 10 ? ("0" + month) : month}-${date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()}T`;
    dateTimeString += `${date.getHours()}:${date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()}:00.000`;
    return dateTimeString;
}