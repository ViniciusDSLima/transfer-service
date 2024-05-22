import {ITransferRepository} from "../../../domain/transfer/repository/transferRepository.interface";
import {InputTransferDTO, OutputTransferDto} from "../interface/transfer.dto";
import {Transfer} from "../../../domain/transfer/entity/transfer.entity";
import {generateUniqueId} from "../../../infrastructure/utils/generateUniqueId";
import {FindUserInterface} from "../../user/interface/findUser.Interface";
import {OutputUserDTO} from "../../user/usecases/dto/user.dto";
import {TransferError} from "../../../domain/errors/implementations/transfer.error";

export class TransferUseCase {
    private _transferRepository: ITransferRepository;
    private _findUser: FindUserInterface;

    constructor(transferRepository: ITransferRepository, findUser: FindUserInterface) {
        this._transferRepository = transferRepository;
        this._findUser = findUser;
    }

    public async execute(input: InputTransferDTO): Promise<OutputTransferDto> {
        const transfer = new Transfer({
            id: generateUniqueId(),
            amount: input.amount,
            senderId: input.senderId,
            receiverId: input.receiverId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const user = await this._findUser.execute(transfer.senderId);

        if(!user){
            throw new Error("User not found");
        }

        await this.verifyUserSeller(user);
        await this.verifyBalance(user, transfer);

        await this._transferRepository.transfer(transfer);

        await this._transferRepository.create(transfer);

        return {
            id: transfer.id,
            amount: transfer.amount,
            senderId: transfer.senderId,
            receiverId: transfer.receiverId,
            createdAt: transfer.createdAt
        };
    }

    private async verifyUserSeller(user: OutputUserDTO): Promise<void> {
        if (user.isSeller){
            throw new TransferError("user shouldn't to transfer!");
        }
    }

    private async verifyBalance(user: OutputUserDTO, transfer: Transfer): Promise<void> {
        if (user.balance <= 0 || user.balance < transfer.amount) {
            throw new TransferError("Insufficient balance");
        }
    }
}