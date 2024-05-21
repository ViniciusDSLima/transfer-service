export class BadRequestError extends Error {
    public type: string;
    public status: number;

    constructor(message: string) {
        super(message);

        this.name = "BadRequestError";
        this.type = "BAD_REQUEST";
        this.status = 400;
    }
}
