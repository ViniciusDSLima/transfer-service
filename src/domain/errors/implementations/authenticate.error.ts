export class AuthenticateError extends Error {
    public type: string;
    public status: number;
    constructor(message: string) {
        super(message);

        this.name = "AuthenticateError";
        this.type = "INVALID_CREDENTIAL";
        this.status = 401;
    }
}
