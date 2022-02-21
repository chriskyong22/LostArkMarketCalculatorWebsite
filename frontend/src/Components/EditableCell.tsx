import React, { useState } from "react"

export const EditableCell = (placeHolder: string, 
                        row: number, 
                        column: number, 
                        initialValue: string = "") => {

    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <>
            <input
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
            />
        </>
    )

}