import { Iuser } from "./Iuser";

export interface ItransactionCategory {
    id: number;
    name: string;
    user: Iuser;
    isExpense: boolean;
}

export interface IvariableTransaction {
    id: number;
    name: string;
    amount: number;
    user: Iuser;
    transactionDt: string; // ISO 8601 date string
    transactionCategory: ItransactionCategory;
}
