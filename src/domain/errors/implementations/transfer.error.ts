export class TransferError extends Error {
    public type: string;
    public status: number;

    constructor(message: string) {
        super(message);

        this.name = "transferError";
        this.type = "INTERNAL_SERVER_ERROR";
        this.status = 500;
    }
}