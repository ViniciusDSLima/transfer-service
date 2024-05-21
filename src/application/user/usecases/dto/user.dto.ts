export interface InputUserDTO {
    id: string;
    fullName: string;
    document: string;
    email: string;
    password: string;
    isSeller: boolean;
    balance: number;
}

export interface OutputUserDTO {
    id: string;
    fullName: string;
    document: string;
    email: string;
    isSeller: boolean;
    balance: number;
}