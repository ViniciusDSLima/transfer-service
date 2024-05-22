export interface InputTransferDTO {
    amount: number;
    senderId: string;
    receiverId: string;
}

export interface OutputTransferDto {
    id: string;
    amount: number;
    senderId: string;
    receiverId: string;
    createdAt: Date;
}
