import { Row, isRow } from "../Models/Row"

const generalExport = (payload: Blob, fileName: string) => {
    let element = document.createElement('a');
    const URI = URL.createObjectURL(payload);
    element.setAttribute('href', URI)
    element.setAttribute('download', fileName);
    element.click();
    element.remove();
    URL.revokeObjectURL(URI);
}

export const exportRow = (row: Row) => {
    const JSONString = JSON.stringify([row], null, 4);
    const file = new Blob([JSONString], {type: "application/json"});
    generalExport(file, `${row.recipeName === '' 
                            ? 'itemName' 
                            : row.recipeName}.json`)
}

export const exportRows = (rows: Row[]) => {
    const JSONString = JSON.stringify(rows, null , 4);
    const file = new Blob([JSONString], {type: "application/json"});
    generalExport(file, 'recipes.json');
}

const generalImport = (onClickHandler:  (event: Event) => Promise<void>): void => {
    let element = document.createElement('input');
    element.setAttribute('accept', ".json");
    element.setAttribute('type', "file")
    element.click();
    element.onchange = onClickHandler;
}

export const importRow = (callback: (...args: any) => void) => {
    generalImport(async function(event: Event) {
        let element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            const file = element.files[0];
            let object: Row;
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
    })
}

export const importRows = (callback: (...args: any) => void) => {
    generalImport(async function(event: Event) {
        let element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            const file = element.files[0]
            let object: Row[]
            try {
                object = JSON.parse(await file.text());
            } catch (error) {
                console.error(error)
                return
            }
            try {
                const isValidRowObject = object.reduce((validRows, row) => {
                    return validRows && isRow(row);
                }, true)
                if (isValidRowObject) {
                    callback(object)
                } else {
                    throw new Error;
                }
            } catch (error) {
                console.log("Invalid File");
                return
            }
        }
    })
}




