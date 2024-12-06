
export interface Ifeature {
    id: number;
    name: string;
}

export interface Irole {
    id: number;
    name: string;
    featureList: Ifeature[];
}