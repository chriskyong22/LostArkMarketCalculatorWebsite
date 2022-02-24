
export interface MaterialRow {
    itemName: string;
    quantity: number;
    price: number;
    readonly id: string;
}

export type MaterialRows = MaterialRow[];

export interface Table {
    category: string;
    showCategory: boolean;
    rows: Row[];
}

export interface Row {
    recipeName: string;
    materials: MaterialRows;
    marketPrice: number;
    tax?: number;
    show: boolean; 
    readonly id: string;
}

export const isTable = (object: any): object is Table => {
    return "category" in object && 
        "rows" in object && 
        object["rows"].reduce((isValid: boolean, row: Row) => {
            return isValid && isRow(row);
        }, true);
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
