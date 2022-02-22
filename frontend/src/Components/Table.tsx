import React, { useEffect, useState } from "react"
import { MemoTableRow } from "./TableRow"
import { Row } from "../Models/Row"
import { calculateMaterialCost } from "../Utilities/ItemCalculations"
import { v4 as uuidv4 } from "uuid"
import { exportRows, importRows } from "../Utilities/ImportExport"

export const Table = () => {

    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        // Retrieve from indexeddb and set the rows
    }, [])

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
        importRows((newRow: Row[]) => {
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
            sortedRows.sort((row1: Row, row2: Row) => {
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

    const sortByMaterialCost = () => {
        console.log("Sorting by Material Cost");
        setRows((oldRows) => {
            let sortedRows = [...oldRows]
            sortedRows.sort((row1: Row, row2: Row) => {
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
            sortedRows.sort((row1: Row, row2: Row) => {
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
                    <th>
                        Profit
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => { 
                    return row.show 
                        ? <MemoTableRow
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
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}