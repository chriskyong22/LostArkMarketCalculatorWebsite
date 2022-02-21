import { Row } from "../Models/Row"
export const exportRow = (row: Row) => {
    const JSONString = JSON.stringify(row, null, 4);
    let element = document.createElement('a');
    const file = new Blob([JSONString], {type: "application/json"});
    const URI = URL.createObjectURL(file);
    element.setAttribute('href', URI)
    element.setAttribute('download', `${row.recipeName}.json`);
    element.click();
    URL.revokeObjectURL(URI);
}