export default function isStatusGood(status: number) {
    if (status === 200) {
        return true;
    }
    else {
        return false;
    }
}