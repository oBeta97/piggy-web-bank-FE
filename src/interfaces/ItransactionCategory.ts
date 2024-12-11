import { Iuser } from "./Iuser";


export interface ItransactionCategory {
    id: number;
    name: string;
    user: Iuser | null;
    isExpense: boolean;
    userId: string;
}
