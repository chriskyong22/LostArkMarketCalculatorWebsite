import { MaterialRow, MaterialRows, isMaterialRow } from "./MaterialRow";

export interface RecipeRow {
    recipeName: string;
    materials: MaterialRows;
    marketPrice: number;
    tax?: number;
    show: boolean; 
    readonly id: string;
}

export const isRecipeRow = (object: any): object is RecipeRow => { 
    return "recipeName" in object && 
        "materials" in object && 
        "marketPrice" in object && 
        "show" in object &&
        "id" in object && 
        object["materials"].reduce((isValid: boolean, row: MaterialRow) => {
            return isValid && isMaterialRow(row);
        }, true)
}

