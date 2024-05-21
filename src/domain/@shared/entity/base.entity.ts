export type BaseRequestType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class BaseEntity {
    constructor(data: BaseRequestType) {
        this._id = data.id;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    private _createdAt: Date;

    get createdAt(): Date {
        return this._createdAt;
    }

    private _updatedAt: Date;

    get updatedAt(): Date {
        return this._updatedAt;
    }

}