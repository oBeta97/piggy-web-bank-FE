export interface Iuser {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
}

export interface IuserCharacteristic {
    id: number;
    avatar: string;
    currency: string;
    dailyAmount: number;
    todayAmount: number;
    minimumSavings: number;
    user: Iuser;
}
