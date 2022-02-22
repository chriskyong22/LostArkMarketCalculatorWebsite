import { MaterialRows, Row } from "../Models/Row";

export const calculateMaterialCost = (items: MaterialRows): number => {
    return items.reduce((total, row) => {
        return total + (row.price * row.quantity);
    }, 0)
}

export const calculateTax = (marketPrice: number): number => {
    const selling = marketPrice;
    const TRANSACTION_FEE = 0.05
    if (selling === 1) {
        return 0
    } else {
        return Math.ceil(selling * TRANSACTION_FEE) 
    }
}

export const calculateProfit = (marketPrice: number, materialCost: number): number => {
    return marketPrice - materialCost - calculateTax(marketPrice);
}
