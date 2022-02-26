export interface MaterialRow { 
    itemName: string;
    quantity: number;
    price: number;
    id: string;
}

export type MaterialRows = MaterialRow[];

export const isMaterialRow = (object: any): object is MaterialRow => {
    return "itemName" in object &&
        "quantity" in object && 
        "price" in object && 
        "id" in object;
}