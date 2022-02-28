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

    const [dragId, setDragId] = useState("");

    const handleDrag = (category: string) => {
        setDragId(category);
    };
    
    const handleDrop = (category: string) => {
        const dragTable = tables.find((table) => table.category === dragId);
        const dropTable = tables.find((table) => table.category === category);

        if (dragTable && dropTable) {
            setTables((oldTables) => {
                return oldTables.map((table) => {
                    if (table.category === dragId) {
                        return dropTable;
                    } 
                    if (table.category === category) {
                        return dragTable;
                    }
                    return table;
                })
            })
        }
    };

    return (
        <div className="categoriesOptionsSearchFilterContainer">
            <input 
                className="categoriesOptionsSearchFilter"
                onChange={handleSearch}
                value={categorySearch}
                placeholder="Search for Category"
            />
            <div className="categoriesOptionsSearchFilterResults">
                {
                    tables.filter((table) => {
                        try {
                            return table.category.toLowerCase().match(categorySearch.toLowerCase())
                        } catch (error) {
                            return table;
                        }
                    
                    }).map((table) => {
                        return (
                            <div key={table.category + "-Search"}>
                                <div
                                    className="categoriesOptionCategoryName"
                                    draggable={true}
                                    style={table.showCategory ? {"color": "green"} : {"color": "red"}}
                                    onClick={() => toggleShow(table)}
                                    data-tooltip={`${table.showCategory ? "Hide" : "Show"}`}
                                    onDragStart={(event) => {event.stopPropagation(); handleDrag(table.category)}}
                                    onDrop={(event) => {event.stopPropagation(); handleDrop(table.category)}}
                                    onDragOver={(event) => {event.preventDefault(); return false;}}
                                >
                                    {table.category}
                                </div>
                                {/* <span> 
                                    &#129041; 
                                </span>
                                <span> 
                                    &#129043; 
                                </span> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}