import React, { useEffect, useState } from "react"
import { Table } from "../Models/Row"
import { getAllTables, addTable, updateTable } from "../Services/Database"
import { Category } from "./Category";

export const Categories = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    useEffect(function getTables() {
        getAllTables().then((table) => {
            setTables(table);
        })
    }, [])

    const addCategory = () => {
        const newTable = {
            category: categoryName,
            showCategory: true,
            rows: []
        };
    
        addTable(newTable).then((result) => {
            setTables((oldTables) => {
                return [
                    ...oldTables,
                    newTable
                ]
            })
        }).catch((_error) => {
            console.log("Category already exists!")
        });
    }

    useEffect(function updateDatabase() {
        tables.forEach((table) => {
            updateTable(table);
        })
    }, [tables])

    const showAllCategory = () => {
        setVisibleAllCategory(true);
    }
    
    const hideAllCategory = () => {
        setVisibleAllCategory(false);
    }

    const setVisibleAllCategory = (showCategory: boolean) => {
        setTables((oldTables) => {
            return oldTables.map((oldTable) => {
                return {
                    ...oldTable,
                    showCategory: showCategory
                }
            })
        })
    }

    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    }

    return (
        <>
            {
                tables.map((table) => {
                    return (
                        table.showCategory && <Category
                            key={table.category}
                            table={table}
                        />
                    )
                })
            }
            <div>
                <input
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={handleCategoryName}
                />
                <button
                    onClick={addCategory}
                >
                    Add Category
                </button>
            </div>

            <button
                onClick={showAllCategory}
            >
                Show All Categories
            </button>
            <button
                onClick={hideAllCategory}
            >
                Hide all Categories 
            </button>
        </>
    )
    
}