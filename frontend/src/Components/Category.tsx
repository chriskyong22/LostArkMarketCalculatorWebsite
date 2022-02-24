import React, { useState } from "react";
import { RecipeTable } from "./RecipeTable"
import { Table } from "../Models/Row"

interface CategoryProps {
    table: Table;
}

export const Category: React.FC<CategoryProps> = ({table}) => {
    return (
        <>
            <RecipeTable
                table={table}
            />
        </>
    )
}