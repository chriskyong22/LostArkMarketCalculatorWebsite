import React, { useState, useCallback } from "react"
import { MaterialRows } from "../Models/MaterialRow"
import { debounce } from "../Utilities/debounce"

interface MaterialItemPriceAndQuantityProps {
    initialPrice: number;
    initialQuantity: number;
    handleDataChange: React.Dispatch<React.SetStateAction<MaterialRows>>;
    rowID: string;
}

export const MaterialItemPriceAndQuantity: React.FC<MaterialItemPriceAndQuantityProps> = ({ initialPrice, 
        initialQuantity, 
        handleDataChange, 
        rowID}) => {

    const [price, setPrice] = useState<string>(initialPrice.toString());
    const [quantity, setQuantity] = useState<string>(initialQuantity.toString());
    
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
        debounceUpdate(event.target.value, "price");
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
        debounceUpdate(event.target.value, "quantity");
    }

    const handleUpdate = (newValue: string, key: string) => {
        handleDataChange((oldRows) => {
            return oldRows.map((row) => {
                if (row.id === rowID) {
                    row = {
                        ...row,
                        [key]: newValue
                    }
                }
                return row;
            });
        })
    }

    const debounceUpdate = useCallback(debounce(handleUpdate), [])



    return (
        <>
            <td>
                <input 
                    className="materialsQuantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </td>
            <td>
                <input 
                    className="materialsPrice"
                    placeholder="Price Per Item"
                    value={price}
                    onChange={handlePriceChange}
                />
            </td>
        </>   
    )
}