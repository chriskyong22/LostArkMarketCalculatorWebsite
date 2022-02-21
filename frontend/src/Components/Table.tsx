import React, { useEffect, useState } from "react"
import { MemoTableRow } from "./TableRow"
import { Row } from "../Models/Row"
import { v4 as uuidv4 } from "uuid"
import { importRow } from "../Utilities/ImportExport"

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

    const handleImportRow = (): void => {
        importRow((newRow: Row) => {
            setRows((oldRows) => {
                return [
                    ...oldRows,
                    newRow
                ]
            })
        })
    }

    return (
        <table className="recipeTable">
            <thead>
                <tr>
                    <th>
                        Recipe Name
                    </th>
                    <th>
                        Materials
                    </th>
                    <th>
                        Cost of Materials
                    </th>
                    <th>
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
                            onClick={handleImportRow}    
                        >
                            Import Recipe
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}