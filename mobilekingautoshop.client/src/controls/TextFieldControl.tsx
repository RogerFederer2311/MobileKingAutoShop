import ITextFieldControl from "../interfaces/controls/ITextFieldControl";
import "../styles/controls/TextFieldControl.css";

export default function TextFieldControl(props: ITextFieldControl) {
    const {
        fieldLabel,
        onChangeTextField,
        currentValue,
        inputID,
        isExpandable,
        isDisabled,
        isPassword
    } = props;

    return (
        <div className="textFieldContainer">
            <span>{fieldLabel}</span>
            {isExpandable &&
                <textarea
                    id={inputID}
                    rows={6}
                    cols={30}
                    disabled={isDisabled}
                    onBlur={onChangeTextField}
                    defaultValue={currentValue}
                ></textarea>
            }
            {!isExpandable && !isPassword &&
                <input
                    id={inputID}
                    value={currentValue}
                    type="text"
                    disabled={isDisabled}
                    onChange={onChangeTextField}
                    
                />
            }
            {isPassword &&
                <input
                    id={inputID}
                    value={currentValue}
                    type="password"
                    disabled={isDisabled}
                    onChange={onChangeTextField}
                />
            }
        </div>
    );
}