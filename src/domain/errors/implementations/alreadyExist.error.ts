export class AlreadyExist extends Error {
    public type: string;
    public status: number;

    constructor(message: string) {
        super(message);

        this.name = "AlreadyExistError";
        this.type = "ALREADY_EXIST_ERROR";
        this.status = 409;
    }
}
