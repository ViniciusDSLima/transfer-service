import {Transfer} from "./transfer.entity";

describe("Transfer", () => {
    it("should create a transfer entity with valid data", () => {
        const transferData = {
            id: "transfer_id",
            createdAt: new Date(),
            updatedAt: new Date(),
            amount: 100,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        const transfer = new Transfer(transferData);

        expect(transfer.amount).toBe(100);
        expect(transfer.senderId).toBe("sender_id");
        expect(transfer.receiverId).toBe("receiver_id");
    });

    it("should throw an error when creating a transfer entity with invalid amount", () => {
        const invalidTransferData = {
            id: "transfer_id",
            createdAt: new Date(),
            updatedAt: new Date(),
            amount: 0,
            senderId: "sender_id",
            receiverId: "receiver_id"
        };

        expect(() => new Transfer(invalidTransferData)).toThrowError("Amount must be greater than 0");
    });
});