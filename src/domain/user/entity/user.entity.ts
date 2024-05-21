import {BaseEntity, BaseRequestType} from "../../@shared/entity/base.entity";
import * as bcrypt from "bcrypt";

export type UserRequestType = BaseRequestType & {
    fullName: string;
    document: string;
    email: string;
    password: string;
    isSeller: boolean;
    balance: number
}


export class User  extends BaseEntity {
    private readonly _email: string;
    private readonly _isSeller: boolean;
    private readonly _fullName: string;
    private readonly _document: string;
    private readonly _balance: number;

    constructor(data: UserRequestType) {
        super(data);
        this._fullName = data.fullName;
        this._document = data.document;
        this._email = data.email;
        this._password = data.password;
        this._isSeller = data.isSeller;
        this._balance = data.balance;
    }

    get balance(): number {
        return this._balance;
    }

    private _password: string;

    get password(): string {
        return this._password;
    }

    get fullName(): string {
        return this._fullName;
    }

    get document(): string {
        return this._document;
    }

    get email(): string {
        return this._email;
    }

    get isSeller(): boolean {
        return this._isSeller;
    }

    public hashPassword(): void {
        this._password = bcrypt.hashSync(this._password, 8);
    }

}