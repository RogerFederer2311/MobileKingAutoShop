/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IDateTimeControl {
    fieldLabel: string;
    onChangeDateTime: (event: any) => void;
    currentValue: string;
    inputID: string;
    isDisabled: boolean;
}