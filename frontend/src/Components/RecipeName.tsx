import React, { useState, useCallback } from "react"
import { debounce } from "../Utilities/debounce"
import { RecipeRow } from "../Models/RecipeRow"

interface RecipeNameProps {
    initialName: string;
    handleDataChange: React.Dispatch<React.SetStateAction<RecipeRow>>;
    rowID: string;
}

export const RecipeName: React.FC<RecipeNameProps> = ({initialName, handleDataChange, rowID}) => {
    
    const [recipeName, setRecipeName] = useState<string>(initialName);

    const handleChangeRecipeName = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setRecipeName(event.currentTarget.value);
        debounceRecipeNameUpdate(event.currentTarget.value);
    }

    const updateRecipeName = (recipeName: string): void => {
        handleDataChange((oldRow) => {
            return {
                ...oldRow,
                recipeName: recipeName
            }
        })
    }

    const debounceRecipeNameUpdate = useCallback(debounce(updateRecipeName), []);
    
    return (
        <textarea 
            placeholder="Recipe Name"
            value={recipeName}
            onChange={handleChangeRecipeName}
        />
    )
}

export const MemoizedRecipeName = React.memo(RecipeName);