/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IDropdownControl {
    inputID: string;
    fieldLabel: string;
    onChangeDropdown: (event: any) => void;
    currentValue: string;
    dropdownOptions: {
        value: string;
        label: string;
    }[];
    isDisabled: boolean;
}