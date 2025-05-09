import ICreateChoices from "../interfaces/utilities/ICreateChoices";

export default function createChoices(props: ICreateChoices) {
    const {
        items,
        labelProperty,
        valueProperty
    } = props;

    const choices = [];

    for (let i = 0; i < items.length; i++) {
        choices.push({
            value: items[i][valueProperty],
            label: items[i][labelProperty]
        });
    }
    return choices;
}