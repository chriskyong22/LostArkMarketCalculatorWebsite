import React, { useState } from "react"
import { RecipeTable } from "../Models/RecipeTable"
import { updateTable } from "../Services/Database"

interface CategorySearchProps {
    setTables: React.Dispatch<React.SetStateAction<RecipeTable[]>>;
    tables: RecipeTable[];
}

export const CategorySearch: React.FC<CategorySearchProps> = ({ tables, setTables }) => {
    const [categorySearch, setCategorySearch] = useState("");
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategorySearch(event.currentTarget.value);
    }

    const toggleShow = (_table: RecipeTable) => {
        const table: RecipeTable = {
            ..._table, 
            showCategory: !_table.showCategory
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
        <div>
            <input 
                onChange={handleSearch}
                value={categorySearch}
                placeholder="Category Name"
            />
            <button>
                Filter
            </button>
            <div className="categoriesOptionsSearchFilter">
                {
                    tables.filter((table) => {
                        try {
                            return table.category.toLowerCase().match(categorySearch.toLowerCase())
                        } catch (error) {
                            return table;
                        }
                    
                    }).map((table) => {
                        return (
                            <div
                                key={table.category + "-Search"}
                                style={table.showCategory ? {"color": "green"} : {"color": "red"}}
                                onClick={() => toggleShow(table)}
                                title={`Click to hide or show ${table.category}`}
                            >
                                {table.category}
                            </div>)
                    })
                }
            </div>
        </div>
    )
}