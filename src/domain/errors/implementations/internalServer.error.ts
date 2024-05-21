export class InternalServerError extends Error {
    public type: string;
    public status: number;
    constructor(message: string) {
        super(message);

        this.name = "InternalServerError";
        this.type = "INTERNAL";
        this.status = 500;
    }
}
