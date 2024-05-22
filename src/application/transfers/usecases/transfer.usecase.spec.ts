import {TransferUseCase} from "./transfer.usecase";
import {TransferError} from "../../../domain/errors/implementations/transfer.error";

const transferRepositoryMock = {
    transfer: jest.fn(),
    create: jest.fn()
};

const findUserMock = {
    execute: jest.fn()
};

const transferUseCase = new TransferUseCase(transferRepositoryMock, findUserMock);

describe("TransferUseCase", () => {
    it("should execute transfer successfully", async () => {
        const inputTransferDTO = {
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        const user = {
            id: "sender_id",
            balance: 200,
            isSeller: false
        };

        findUserMock.execute.mockResolvedValue(user);

        const result = await transferUseCase.execute(inputTransferDTO);

        expect(result).toEqual({
            id: expect.any(String),
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id",
            createdAt: expect.any(Date)
        });
        expect(transferRepositoryMock.transfer).toHaveBeenCalledWith(expect.any(Object));
        expect(transferRepositoryMock.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw an error when user is not found", async () => {
        findUserMock.execute.mockResolvedValue(null);

        const inputTransferDTO = {
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        await expect(transferUseCase.execute(inputTransferDTO)).rejects.toThrowError("User not found");
    });

    it("should throw an error when user is a seller", async () => {
        const user = {
            id: "seller_id",
            balance: 200,
            isSeller: true
        };

        findUserMock.execute.mockResolvedValue(user);

        const inputTransferDTO = {
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        await expect(transferUseCase.execute(inputTransferDTO)).rejects.toThrowError(TransferError);
    });

    it("should throw an error when user balance is insufficient", async () => {
        const user = {
            id: "sender_id",
            balance: 50,
            isSeller: false
        };

        findUserMock.execute.mockResolvedValue(user);

        const inputTransferDTO = {
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        await expect(transferUseCase.execute(inputTransferDTO)).rejects.toThrowError("Insufficient balance");
    });
});
