import {VerifyBalanceUseCase} from "./verifyBalance.usecase";

const MockUserRepository = () => {
    return {
        findById: jest.fn()
    };
};

describe("VerifyBalanceUseCase", () => {
    let verifyBalanceUseCase: VerifyBalanceUseCase;
    let userRepository: any;

    beforeEach(() => {
        userRepository = MockUserRepository();
        verifyBalanceUseCase = new VerifyBalanceUseCase(userRepository);
    });

    it("should return undefined if user is not found", async () => {
        userRepository.findById.mockResolvedValue(undefined);

        const result = await verifyBalanceUseCase.execute({
            senderId: "nonexistent-id",
            balance: 1000
        });

        expect(result).toBeUndefined();
        expect(userRepository.findById).toHaveBeenCalledWith("nonexistent-id");
    });

    it("should return isValid true if user balance is greater than or equal to input balance", async () => {
        const user = {
            id: "user-id",
            fullName: "Vinicius",
            email: "vinicius@gmail.com",
            password: "hashedpassword",
            balance: 5000,
            document: "12345678910",
            isSeller: false
        };
        userRepository.findById.mockResolvedValue(user);

        const result = await verifyBalanceUseCase.execute({
            senderId: "user-id",
            balance: 3000
        });

        expect(result).toEqual({ isValid: true });
        expect(userRepository.findById).toHaveBeenCalledWith("user-id");
    });

    it("should return isValid false if user balance is less than input balance", async () => {
        const user = {
            id: "user-id",
            fullName: "Vinicius",
            email: "vinicius@gmail.com",
            password: "hashedpassword",
            balance: 5000,
            document: "12345678910",
            isSeller: false
        };
        userRepository.findById.mockResolvedValue(user);

        const result = await verifyBalanceUseCase.execute({
            senderId: "user-id",
            balance: 7000
        });

        expect(result).toEqual({ isValid: false });
        expect(userRepository.findById).toHaveBeenCalledWith("user-id");
    });
});
