import { DBSchema, openDB } from "idb"
import { ToolsCategory } from "../Data/ToolsTable";
import { RecipeTable } from "../Models/RecipeTable"
import { RecipeRow } from "../Models/RecipeRow"

const DATABASE_NAME = `CATEGORIES`
const OBJECT_STORE = `CATEGORIES-STORE`
const VERSION_NUMBER = 1;

interface MyDB extends DBSchema {
    'CATEGORIES-STORE': {
        key: string;
        value: {
            category: string;
            showCategory: boolean;
            rows: RecipeRow[];
        };
    };
}

const dbPromise = openDB<MyDB>(DATABASE_NAME, VERSION_NUMBER, {
    upgrade(oldDB) { 
        const objectStore = oldDB.createObjectStore(OBJECT_STORE, 
            { keyPath: 'category'}
        );
        objectStore.put(ToolsCategory);
    }
})

export const updateTable = async (table: RecipeTable): Promise<void> => {
    (await dbPromise).put(OBJECT_STORE, table);
}

export const addTable = async (table: RecipeTable): Promise<string> => {
    return (await dbPromise).add(OBJECT_STORE, table);
}

export const getAllTables = async (): Promise<RecipeTable[]> => {
    return (await dbPromise).getAll(OBJECT_STORE);
}

export const getTable = async (category: string): Promise<RecipeTable | undefined> => {
    return (await dbPromise).get(OBJECT_STORE, category);
}

export const deleteTable = async (category: string): Promise<void> => {
    return (await dbPromise).delete(OBJECT_STORE, category);
}
