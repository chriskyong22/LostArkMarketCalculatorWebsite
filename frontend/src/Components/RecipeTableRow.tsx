import React, { useState, useEffect, useCallback } from "react"
import { MaterialTable } from "./MaterialTable"
import { RecipeRow } from "../Models/RecipeRow"
import { MemoizedRecipeName } from "./RecipeName"
import { debounce } from "../Utilities/debounce"
import { exportRow } from "../Utilities/ImportExport"
import { calculateProfit, calculateTax } from "../Utilities/ItemCalculations"

interface TableRowProps {
    initialRowState: RecipeRow;
    setRows: React.Dispatch<React.SetStateAction<RecipeRow[]>>;
}

export const RecipeTableRow: React.FC<TableRowProps> = ({initialRowState, setRows}) => {
    
    const [currentRow, setCurrentRow] = useState<RecipeRow>(initialRowState);
    
    useEffect(function updateRow() {
        setRows((oldRows) => {
            return oldRows.map((row) => {
                if (row.id === currentRow.id) {
                    return currentRow;
                }
                return row;
            })
        })
    }, [currentRow, setRows])

    const handleHide = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentRow((oldCurrentRow) => {
            return {
                ...oldCurrentRow,
                show: false
            }
        })
    }

    const handleDelete = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setRows((oldRows) => {
            return oldRows.filter((row) => {
                return row.id !== currentRow.id;
            })
        })
    }

    const [materialCost, setMaterialCost] = useState<number>(0);
    const [marketPrice, setMarketPrice] = useState<string>(currentRow.marketPrice.toString());

    const handleMarketPrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newMarketPrice = event.currentTarget.value;
        setMarketPrice(newMarketPrice);
        debounceUpdateMarketPrice(newMarketPrice);
    }

    const updateMarketPrice = (newMarketPrice: string) => {
        setCurrentRow((oldCurrentRow) => {
            return {
                ...oldCurrentRow,
                marketPrice: parseFloat(newMarketPrice)
            }
        })
    }

    const debounceUpdateMarketPrice = useCallback(debounce(updateMarketPrice, 500), [setCurrentRow]);

    /**
     * Taken from 
     * https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
     * @param value percentage from 0 to 1 (0 is green, 1 is red)
     * @returns the css hsl color
     */
    const getColor = (value: number): string => {
        var hue=((1-value)*120).toString(10);
        return ["hsl(",hue,",100%,50%)"].join("");
    }

    const handleProfitColor = () => {
        const profit = calculateProfit(currentRow.marketPrice, materialCost)
        const MIN_GREEN_COLOR = 0.325;
        const MIN_RED_COLOR = 0.90;
        const PROFIT_FOR_MAX_GREEN = 1000;
        const PROFIT_FOR_MAX_RED = 1000;
        switch (true) {
            case (isNaN(profit)):
                return {
                    backgroundColor: "yellow"
                }
            case (profit > 0):
                return {
                    backgroundColor: getColor(MIN_GREEN_COLOR - 
                        Math.min(MIN_GREEN_COLOR, profit / PROFIT_FOR_MAX_GREEN))
                }
            case (profit < 0): 
                return {
                    backgroundColor: getColor(MIN_RED_COLOR + 
                            Math.min(1 - MIN_RED_COLOR, -1 * profit / PROFIT_FOR_MAX_RED))
                }
            default: 
                return {

                }
        }
    }

    const handleExport = () => {
        exportRow(currentRow);
    }

    return (
        <tr>
            <td className="recipeName">
                <MemoizedRecipeName
                    initialName={currentRow.recipeName}
                    handleDataChange={setCurrentRow}
                    rowID={currentRow.id}
                />
            </td>
            <td>
                <MaterialTable
                    initialMaterials={currentRow.materials}
                    setMaterials={setCurrentRow}
                    rowID={currentRow.id}
                    setMaterialCost={setMaterialCost}
                />
            </td>
            <td 
                className="materialsCost"
            >
                {materialCost.toString()}
            </td>
            <td 
                className="marketPrice" 
            >
                <input 
                    name="id_marketPrice"
                    value={marketPrice}
                    onChange={handleMarketPrice}
                />
            </td>
            <td
                className="tax"
                title={`ceil(0.05 * ${marketPrice}) unless marketPrice is 1, then it is 0.`}
            >
                {calculateTax(currentRow.marketPrice).toString()}
            </td>
            <td >   
                <div 
                    className="profit"
                    style={handleProfitColor()}
                >
                    {calculateProfit(currentRow.marketPrice, materialCost).toString()}
                </div>
            </td>
            <td>
                <div className="rowOptions">
                    <button
                        onClick={handleHide}
                    >
                        Hide
                    </button>
                    <button
                        className={"deletebtn"}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleExport}>
                        Export
                    </button>
                </div>
            </td>
        </tr>
    ) 
}

export const MemoRecipeTableRow = React.memo(RecipeTableRow);