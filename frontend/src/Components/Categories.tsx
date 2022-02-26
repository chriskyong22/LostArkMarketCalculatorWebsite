import React, { useEffect, useState } from "react"
import { RecipeTable } from "../Models/RecipeTable"
import { getAllTables, updateTable, deleteTable } from "../Services/Database"
import { MemoizedRecipeTable } from "./RecipeTable";

import { CategoriesOptions } from "./CategoriesOptions"

export const Categories = () => {
    const [tables, setTables] = useState<RecipeTable[]>([]);

    useEffect(function getTables() {
        getAllTables().then((table) => {
            setTables(table);
        })
    }, [])

    useEffect(function updateDatabase() {
        tables.reduce((_oldTable, table) => {
            updateTable(table).catch((error) => {
                console.error(error);
            })
            return table;
        }, {});
    }, [tables])

    const handleDeleteCategory = (category: string) => {
        deleteTable(category)
            .then(() => {
                setTables((oldTables) => {
                    return oldTables.filter((table) => {
                        return table.category !== category;
                    })
                })
            })
            .catch((error) => {
                // TODO: add popup for notification
                console.error(error);
            })
    }

    const handleHideCategory = (_table: RecipeTable) => {
        const table: RecipeTable = {
            ..._table, 
            showCategory: false
        }
        
        updateTable(table)
            .then(() => {
                setTables((oldTables) => {
                    return oldTables.map((oldTable) => {
                        if (oldTable.category === table.category) {
                            return table
                        }
                        return oldTable
                    })
                })
            })
            .catch((error) => {
                //TODO: add popup for notification
                console.error(error);
            })
    }

    return (
        <>
            {
                tables.map((table) => {
                    return (
                        table.showCategory && <MemoizedRecipeTable
                            deleteCategory={handleDeleteCategory}
                            hideCategory={handleHideCategory}
                            key={table.category}
                            table={table}
                        />
                    )
                })
            }
            <CategoriesOptions
                tables={tables}
                setTables={setTables}
            />
        </>
    )
    
}