import React, { useState, useCallback } from "react"
import { MaterialRows } from "../Models/MaterialRow"
import { debounce } from "../Utilities/debounce"

interface MaterialItemNameProps {
    initialName: string;
    handleDataChange: React.Dispatch<React.SetStateAction<MaterialRows>>;
    rowID: string;
}

export const MaterialItemName: React.FC<MaterialItemNameProps> = ({ initialName, handleDataChange, rowID }) => {

    const [value, setValue] = useState(initialName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debounceUpdate(event.target.value);
    }

    const handleUpdate = (newValue: string) => {
        handleDataChange((oldRows) => {
            return oldRows.map((row) => {
                if (row.id === rowID) {
                    row.itemName = newValue;
                }
                return row;
            });
        })
    }

    const debounceUpdate = useCallback(debounce(handleUpdate), [])

    return (
        <input
            className="materialsName"
            placeholder="Item Name"
            value={value}
            onChange={handleChange}
        />
    )
}
