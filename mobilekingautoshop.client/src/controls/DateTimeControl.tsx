import IDateTimeControl from "../interfaces/controls/IDateTimeControl";
import "../styles/controls/DateTimeControl.css";

export default function DateTimeControl(props: IDateTimeControl) {
    const {
        fieldLabel,
        inputID,
        currentValue,
        isDisabled,
        onChangeDateTime
    } = props;
    return (
        <div className="dateTimeContainer">
            <span>{fieldLabel}</span>
            <input
                id={inputID}
                value={currentValue}
                type="datetime-local"
                disabled={isDisabled}
                onChange={onChangeDateTime}
            />
        </div>
    );
}