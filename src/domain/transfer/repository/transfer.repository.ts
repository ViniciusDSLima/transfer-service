import {Transfer} from "../entity/transfer.entity";
import {ITransferRepository} from "./transferRepository.interface";
import {prisma} from "../../../infrastructure/utils/prisma";
import {TransferError} from "../../errors/implementations/transfer.error";
import {InternalServerError} from "../../errors/implementations/internalServer.error";

export class TransferRepository implements ITransferRepository {
    public async create(input: Transfer): Promise<void> {
        try {
            await prisma.transfer.create({
                data: {
                    id: input.id,
                    amount: input.amount,
                    sender: {
                        connect: {
                            id: input.senderId
                        }
                    },
                    receiver: {
                        connect: {
                            id: input.receiverId
                        }
                    },
                    createdAt: input.createdAt
                }
            });
        } catch (error) {
            throw new InternalServerError(`error creating transfer (repository) | Error: ${error}`);
        }

    }

    public async transfer(input: Transfer): Promise<void> {
         try {
            await prisma.$transaction(async () => {
                await prisma.user.update({
                    where: {id: input.senderId},
                    data: {balance: {decrement: input.amount}}
                });

                await prisma.user.update({
                    where: {id: input.receiverId},
                    data: {balance: {increment: input.amount}}
                });
            });
         } catch (error){
             throw new TransferError(`Error transferring (repository) | Error: ${error}`);
         }
    }
}