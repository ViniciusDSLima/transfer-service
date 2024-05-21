export class NotFoundError extends Error {
    public type: string;
    public status: number;
    public messageTranslated: string;

    constructor(message: string, messageTranslated: string) {
        super(message);

        this.messageTranslated = messageTranslated;
        this.name = "NotFoundError";
        this.type = "NOT_FOUND";
        this.status = 404;
    }
}
