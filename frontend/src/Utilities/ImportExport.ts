import { Row, isRow } from "../Models/Row"

export const exportRow = (row: Row) => {
    const JSONString = JSON.stringify(row, null, 4);
    let element = document.createElement('a');
    const file = new Blob([JSONString], {type: "application/json"});
    const URI = URL.createObjectURL(file);
    element.setAttribute('href', URI)
    element.setAttribute('download', `${row.recipeName}.json`);
    element.click();

    element.remove();
    URL.revokeObjectURL(URI);
}

export const importRow = (callback: (...args: any) => void) => {
    let element = document.createElement('input');
    element.setAttribute('accept', ".json");
    element.setAttribute('type', "file")
    element.click();
    element.onchange = async function(event: Event) {
        element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            const file = element.files[0];
            let object: unknown;
            try {
                object = JSON.parse(await file.text());
            } catch (error) {
                console.error(error);
                return;
            }
            if (isRow(object)) {
                callback(object);
            } else {
                console.log("Invalid File!")
            }
        }
    }
}



