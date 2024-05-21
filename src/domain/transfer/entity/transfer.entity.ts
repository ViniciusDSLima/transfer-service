import {BaseEntity, BaseRequestType} from "../../@shared/entity/base.entity";
import {BadRequestError} from "../../errors/implementations/badRequest.error";

export type TransferRequestType = BaseRequestType & {
    amount: number;
    senderId: string;
    receiverId: string;
}

export class Transfer extends BaseEntity{
    private readonly _amount: number;
    private readonly _senderId: string;
    private readonly _receiverId: string;

    constructor(data: TransferRequestType) {
        super(data);
        this._amount = data.amount;
        this._senderId = data.senderId;
        this._receiverId = data.receiverId;

        this.validate();
    }

    get amount(): number {
        return this._amount;
    }

    get senderId(): string {
        return this._senderId;
    }

    get receiverId(): string {
        return this._receiverId;
    }

    private validate(): void {
        if (this._amount <= 0){
            throw new BadRequestError("Amount must be greater than 0");
        }
    }

}