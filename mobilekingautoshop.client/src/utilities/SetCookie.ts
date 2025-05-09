/* eslint-disable no-extra-boolean-cast */
export default function setCookie(name: string, value: string, minutesUntilExpiry: number) {
    if (!!minutesUntilExpiry) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (minutesUntilExpiry * 60 * 1000));
        document.cookie = `${name}=${value};expires=${minutesUntilExpiry};path=/`;
    }
    else {
        document.cookie = `${name}=${value};path=/`;
    }
}