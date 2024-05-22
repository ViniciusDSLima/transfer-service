
export interface verifyBalanceInputDto {
    balance: number;
    senderId: string;
}

export interface verifyBalanceOutputDto {
    isValid: boolean;
}