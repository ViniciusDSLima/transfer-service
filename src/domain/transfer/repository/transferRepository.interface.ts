import {Transfer} from "@prisma/client";

export interface ITransferRepository {
    create(input: Transfer): Promise<void>;
    transfer(input: Transfer): Promise<void>;
}