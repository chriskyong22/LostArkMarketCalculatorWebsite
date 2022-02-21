import React, { useEffect, useState } from "react"
import { MaterialRows } from "../Models/Row"
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
    }

    useEffect(() => {
        setMaterials((oldRow) => {
            return {
                ...oldRow,
                materials: items
            }
        })
    }, [items])
    
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

    const calculateMaterialCost = () => {
        setMaterialCost(items.reduce((total, row) => {
            return total + (row.price * row.quantity);
        }, 0));
    }

    useEffect(() => {
        calculateMaterialCost();
    }, [items])

    return (
        <table className="materialsTable">
            <thead>
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
                    <th>

                    </th>
                </tr>
            </thead>
            <tbody>
                {
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
                                        title={"Remove row"}
                                        name={item.id}
                                        onClick={handleDeleteRow}
                                    >
                                        [D]
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