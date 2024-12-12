import { Iuser } from "./Iuser";


export interface IfixedTransaction {
    id: number; 
    name: string; 
    amount: number; 
    user: Iuser; 
    period: number; 
}

export interface IfixedTransactionDTO {
    name: string; 
    amount: number; 
    period: number; 
}
