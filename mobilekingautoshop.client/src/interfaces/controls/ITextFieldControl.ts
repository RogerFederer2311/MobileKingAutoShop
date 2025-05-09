/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ITextFieldControl {
    fieldLabel: string;
    onChangeTextField: (event: any) => void;
    currentValue: string;
    inputID: string;
    isExpandable?: boolean;
    isDisabled?: boolean;
    isPassword?: boolean;
}