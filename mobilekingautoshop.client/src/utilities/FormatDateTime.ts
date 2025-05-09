export default function formatDateTime(date: Date, includeTime: boolean) {
    if (!date) {
        return "";
    }

    let dateTimeString = "";
    const month = date.getMonth() + 1;
    dateTimeString = `${date.getFullYear()}-${month < 10 ? ("0" + month) : month}-${date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()}`;
    if (includeTime) {
        dateTimeString += ` ${date.getHours() > 12 ? (date.getHours() % 12) : date.getHours() }:${date.getMinutes() < 10 ?("0" + date.getMinutes()) : date.getMinutes()} ${date.getHours() > 12 ? "PM": "AM"}`;
    }
    return dateTimeString;
}