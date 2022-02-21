
interface MaterialRow {
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