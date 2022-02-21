
export interface MaterialRow {
    itemName: string;
    quantity: number;
    price: number;
    readonly id: string;
}

export type MaterialRows = MaterialRow[];

export interface Row {
    recipeName: string;
    materials: MaterialRows;
    marketPrice: number;
    tax?: number;
    show: boolean; 
    readonly id: string;
}

export const isRow = (object: any): object is Row => { 
    return "recipeName" in object && 
        "materials" in object && 
        "marketPrice" in object && 
        "show" in object &&
        "id" in object && 
        object["materials"].reduce((isValid: boolean, row: MaterialRow) => {
            return isValid && isMaterialRow(row);
        }, true)
}

export const isMaterialRow = (object: any): object is MaterialRow => {
    return "itemName" in object &&
        "quantity" in object && 
        "price" in object && 
        "id" in object;
}