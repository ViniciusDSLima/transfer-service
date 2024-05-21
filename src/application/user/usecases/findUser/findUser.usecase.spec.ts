import {FindUser} from "./findUser.usecase";

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findByEmail: jest.fn()
    };
};

describe("find user usecase", () => {

    let userRepository: any;
    let findUser: any;

    beforeEach(() => {
        userRepository = MockRepository();

        findUser = new FindUser(userRepository);
    });

    it("should find user by email", async () => {
        const userEmail = {
            id: "user-id",
            fullName: "Vinicius",
            email: "vinicius@gmail.com",
            balance: 5000,
            document: "12345678910",
            isSeller: false
        };

        userRepository.findByEmail.mockResolvedValue(userEmail);

        const result = await findUser.execute("vinicius@gmail.com");

        expect(result).toEqual(userEmail);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("vinicius@gmail.com");
        expect(userRepository.findById).not.toHaveBeenCalled();
    });

    it("should return user by ID", async () => {
        const userId = {
            id: "user-id",
            fullName: "Vinicius",
            email: "vinicius@gmail.com",
            password: "hashedpassword",
            balance: 5000,
            document: "12345678910",
            isSeller: false
        };

        userRepository.findByEmail.mockImplementation(() => Promise.resolve(undefined));

        userRepository.findById.mockResolvedValue(userId);

        const result = await findUser.execute("user-id");

        expect(result).toEqual(userId);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("user-id");
        expect(userRepository.findById).toHaveBeenCalledWith("user-id");
    });

    it("should return undefined when user is not found", async () => {
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.findById.mockResolvedValue(null);

        const result = await findUser.execute("nonexistent-id-or-email");

        expect(result).toBeUndefined();
        expect(userRepository.findByEmail).toHaveBeenCalledWith("nonexistent-id-or-email");
        expect(userRepository.findById).toHaveBeenCalledWith("nonexistent-id-or-email");
    });
});