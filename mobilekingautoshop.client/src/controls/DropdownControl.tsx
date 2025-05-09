import "../styles/controls/DropdownControl.css";
import IDropdownControl from "../interfaces/controls/IDropdownControl";

export default function DropdownControl(props: IDropdownControl) {
    const {
        fieldLabel,
        currentValue,
        inputID,
        onChangeDropdown,
        isDisabled,
        dropdownOptions
    } = props;
    return (
        <div className="dropdownContainer">
            <span>{fieldLabel}</span>
            <select
                value={currentValue}
                id={inputID}
                onChange={onChangeDropdown}
                disabled={isDisabled}
            >
                <option value="">Select</option>
                {dropdownOptions.map(dropdownOption => {
                    return (
                        <option value={dropdownOption.value}>{dropdownOption.label}</option>
                    )
                })}
            </select>
        </div>
    );
}