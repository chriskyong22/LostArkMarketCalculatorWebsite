import { RecipeRow, isRecipeRow } from "./RecipeRow"

export interface RecipeTable {
    category: string;
    showCategory: boolean;
    rows: RecipeRow[];
}

export const isRecipeTable = (object: any): object is RecipeTable => {
    return "category" in object && 
        "rows" in object && 
        object["rows"].reduce((isValid: boolean, row: RecipeRow) => {
            return isValid && isRecipeRow(row);
        }, true);
}