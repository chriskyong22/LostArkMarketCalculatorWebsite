import React, { useState } from "react"
import { CategorySearch } from "./CategorySearch";
import { addTable, updateTable } from "../Services/Database"
import { RecipeTable } from "../Models/RecipeTable"

interface CategoriesOptionsProps {
    tables: RecipeTable[];
    setTables: React.Dispatch<React.SetStateAction<RecipeTable[]>>;
}

export const CategoriesOptions: React.FC<CategoriesOptionsProps> = ({ tables, setTables }) => {
    
    const [showOptions, setShowOptions] = useState(false);
    
    const [categoryName, setCategoryName] = useState<string>("");

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

    const showAllCategory = () => {
        setVisibleAllCategory(true);
    }
    
    const hideAllCategory = () => {
        setVisibleAllCategory(false);
    }
    
    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
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

    const toggleShowOptions = () => {
        setShowOptions((oldShowOptions) => !oldShowOptions);
    }

    return (
        <div className="categoriesOptionsContainer">
          {
              showOptions &&
              <div style={{"display": "contents"}}>             
                <div className="categoriesOptionsContainer">
                    <div className="categoriesOptionAddContainer">
                        <input
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={handleCategoryName}
                        />
                        <button
                            className="categoriesOptionAddContainerBtn"
                            onClick={addCategory}
                        >
                            Add Category
                        </button>
                    </div>
                    <CategorySearch
                        tables={tables}
                        setTables={setTables}
                    />
                    <div className="categoriesOptionsBtnContainer">
                        <button
                            onClick={showAllCategory}
                        >
                            Show All Categories
                        </button>
                        <button
                            onClick={hideAllCategory}
                        >
                            Hide All Categories 
                        </button>
                    </div>
                    <button
                        className="categoriesOptionsHidebtn"
                        onClick={toggleShowOptions}
                    >
                            Hide Options 
                    </button>
                </div>
            </div>
          }  
          {
              !showOptions && 
                <button
                    onClick={toggleShowOptions}
                >
                    Show Options
                </button>
            }
        </div>
    )
}