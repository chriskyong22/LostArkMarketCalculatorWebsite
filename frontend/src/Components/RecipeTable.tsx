import React, { useEffect, useState } from "react"
import { MemoRecipeTableRow } from "./RecipeTableRow"
import { RecipeRow } from "../Models/RecipeRow"
import { RecipeTable as RecipeTableModel } from "../Models/RecipeTable"
import { calculateMaterialCost, calculateProfit } from "../Utilities/ItemCalculations"
import { v4 as uuidv4 } from "uuid"
import { exportRows, importRows } from "../Utilities/ImportExport"
import { updateTable } from "../Services/Database"

interface TableProps {
    table: RecipeTableModel;
    deleteCategory: (category: string) => void
    hideCategory: (table: RecipeTableModel) => void
}

export const RecipeTable: React.FC<TableProps> = ({table,  hideCategory, deleteCategory}) => {

    const [rows, setRows] = useState<RecipeRow[]>(table.rows);

    useEffect(() => {
        // Can cause the category name and category show to go out of sync
        updateTable({
            ...table,
            rows: rows
        })
    }, [rows])

    const handleAddNewRow = () => {
        setRows((oldRows) => {
            return [
                ...oldRows,
                {
                    recipeName: "",
                    materials: [],
                    marketPrice: 0,
                    tax: 0,
                    show: true,
                    id: uuidv4()
                }
            ]
        })
    }

    const handleShowAllRows = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        setRows((oldRows) => {
            console.log("Old rows", oldRows);
            return oldRows.map((row) => {
                return {
                    ...row, 
                    show: true
                }
            })
        })
    }

    // TODO: handle duplicate imports (delete one of the duplicates)
    const handleImportRows = (): void => {
        importRows((newRow: RecipeRow[]) => {
            setRows((oldRows) => {
                return [
                    ...oldRows,
                    ...newRow
                ]
            })
        })
    }

    const handleExportRows = (): void => {
        exportRows(rows);
    }

    const sortByRecipeName = () => {
        console.log("Sorting by Recipe Name");
        setRows((oldRows) => {
            let sortedRows = [...oldRows]
            sortedRows.sort((row1: RecipeRow, row2: RecipeRow) => {
                if (row1.recipeName < row2.recipeName) {
                    return -1
                } else if (row1.recipeName > row2.recipeName) {
                    return 1
                } else {
                    return 0;
                }
            })
            return sortedRows;
        })
    }

    const sortByProfit = () => {
        console.log("Sort by Profit")
        setRows((oldRows) => {
            let sortedRows = [...oldRows]
            sortedRows.sort((row1: RecipeRow, row2: RecipeRow) => {
                const row1Profit = calculateProfit(row1.marketPrice, calculateMaterialCost(row1.materials))
                const row2Profit = calculateProfit(row2.marketPrice, calculateMaterialCost(row2.materials))
                if (row1Profit < row2Profit) {
                    return -1;
                } else if (row1Profit > row2Profit) {
                    return 1;
                } else {
                    return 0;
                }
            })
            return sortedRows;
        })
    }

    const sortByMaterialCost = () => {
        console.log("Sorting by Material Cost");
        setRows((oldRows) => {
            let sortedRows = [...oldRows]
            sortedRows.sort((row1: RecipeRow, row2: RecipeRow) => {
                const row1MaterialCost = calculateMaterialCost(row1.materials);
                const row2MaterialCost = calculateMaterialCost(row2.materials);
                if (row1MaterialCost < row2MaterialCost) {
                    return -1
                } else if (row1MaterialCost > row2MaterialCost) {
                    return 1
                } else {
                    return 0;
                }
            })
            return sortedRows;
        })
    }

    const sortByMarketPrice = () => {
        setRows((oldRows) => {
            let sortedRows = [...oldRows]
            sortedRows.sort((row1: RecipeRow, row2: RecipeRow) => {
                if (row1.marketPrice < row2.marketPrice) {
                    return -1
                } else if (row1.marketPrice > row2.marketPrice) {
                    return 1
                } else {
                    return 0;
                }
            })
            return sortedRows;
        })
    }

    return (
        <table className="recipeTable">
            <thead>
                <tr>
                    <th colSpan={7}>
                        {table.category}
                    </th> 
                </tr>
                <tr>
                    <th
                        onClick={sortByRecipeName}
                    >
                        Recipe Name
                    </th>
                    <th>
                        Materials
                    </th>
                    <th
                        onClick={sortByMaterialCost}
                    >
                        Cost of Materials
                    </th>
                    <th
                        onClick={sortByMarketPrice}
                    >
                        Market Price
                    </th>
                    <th>
                        Tax
                    </th>
                    <th
                        onClick={sortByProfit}
                    >
                        Profit
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => { 
                    return row.show 
                        ? <MemoRecipeTableRow
                            key={row.id}
                            initialRowState={row}
                            setRows={setRows} 
                        />
                        : <React.Fragment key={row.id}></React.Fragment>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={7}>
                        <button
                            onClick={handleAddNewRow}
                        >
                            Add Recipe
                        </button>
                        <button
                            onClick={handleShowAllRows}
                        >
                            Show All Recipes
                        </button>
                        <button 
                            onClick={handleImportRows}    
                        >
                            Import Recipe(s)
                        </button>
                        <button
                            onClick={handleExportRows}
                        >
                            Export All Recipes
                        </button>
                        <button
                            onClick={() => hideCategory(table)}
                        >
                            Hide Category 
                        </button>
                        <button
                            onClick={() => deleteCategory(table.category)}
                        >
                            Delete Category 
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export const MemoizedRecipeTable = React.memo(RecipeTable);