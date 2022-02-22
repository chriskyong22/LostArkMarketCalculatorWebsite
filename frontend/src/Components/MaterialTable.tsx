import React, { useEffect, useState } from "react"
import { MaterialRows } from "../Models/Row"
import { calculateMaterialCost } from "../Utilities/ItemCalculations"
import { MaterialItemName } from "./MaterialItemName" 
import { MaterialItemPriceAndQuantity } from "./MaterialItemPriceAndQuantity"
import { Row } from "../Models/Row"
import { v4 as uuidv4 } from "uuid"

interface MaterialTableProps {
    setMaterialCost: React.Dispatch<React.SetStateAction<number>>;
    initialMaterials: MaterialRows;
    setMaterials: React.Dispatch<React.SetStateAction<Row>>;
    rowID: string;
}

export const MaterialTable: React.FC<MaterialTableProps> = ({setMaterials, setMaterialCost, initialMaterials }) => {

    const [items, setItems] = useState<MaterialRows>(initialMaterials);
    const [showItems, setShowItems] = useState<boolean>(true);

    const addNewItem = () => {
        setItems((oldRows) => {
            console.log(oldRows);
            return [
                ...oldRows,
                {
                    itemName: "",
                    quantity: 1,
                    price: 0,
                    id: uuidv4()
                }
            ]
        })
        setShowItems(true);
    }

    useEffect(() => {
        setMaterials((oldRow) => {
            return {
                ...oldRow,
                materials: items
            }
        })
    }, [items, setMaterials])
    
    const handleDeleteRow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = event.currentTarget.name;
        setItems((oldItems) => {
          return oldItems.filter(function removeRowAndUpdatePrice(item) {
              if (item.id === id) {
                setMaterialCost((oldCost) => {
                    return oldCost - (item.quantity * item.price)
                })
              }
              return item.id !== id;
          })  
        })
    }

    const handleMaterialCost = () => {
        setMaterialCost(calculateMaterialCost(items));
    }

    useEffect(() => {
        handleMaterialCost();
    }, [items, setMaterialCost])

    const toggleShowItems = () => {
        setShowItems((oldShowItems) => !oldShowItems);
    }

    return (
        <table className="materialsTable">
            <thead
                onClick={toggleShowItems}
            >
                <tr>
                    <th>
                        Item Name
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Price
                    </th>
                    <th
                        title={showItems ? "Hide Items" : "Show Items"}
                    >
                        {showItems ? "-" : "+"}
                    </th>
                </tr>
            </thead>
            <tbody>
                { showItems && 
                    items.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <MaterialItemName
                                        initialName={item.itemName}
                                        handleDataChange={setItems}
                                        rowID={item.id}
                                    />
                                </td>
                                <MaterialItemPriceAndQuantity
                                    initialPrice={item.price}
                                    initialQuantity={item.quantity}
                                    handleDataChange={setItems}
                                    rowID={item.id}
                                />
                                <td>
                                    <button
                                        className="materialsRowDeletebtn deletebtn"
                                        title={"Delete Item"}
                                        name={item.id}
                                        onClick={handleDeleteRow}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <button 
                            className="materialsAddNewRowBtn"
                            onClick={addNewItem}
                        >
                            Add Item
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}