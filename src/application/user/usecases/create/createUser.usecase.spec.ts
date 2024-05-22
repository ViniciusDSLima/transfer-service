import {CreateUserUseCase} from "./createUser.usecase";
import {AlreadyExist} from "../../../../domain/errors/implementations/alreadyExist.error";

const createUserRequest = {
    id: "",
    fullName: "Vinicius",
    email: "vinicius@gmail.com",
    password: "password",
    balance: 5000,
    document: "12345678910",
    isSeller: false
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn()
    };
};

const MockFindUser = () => {
    return{
        execute: jest.fn()
    };
};

describe("Create User Usecase", () => {

    let createUserUseCase: CreateUserUseCase;
    let userRepository: any;
    let findUser: any;


    beforeEach(() => {
        userRepository = MockRepository();
        findUser = MockFindUser();

        createUserUseCase = new CreateUserUseCase(userRepository, findUser);
    });


    it("Should be able to create a new user", async () => {

        const result = await createUserUseCase.execute(createUserRequest);

        expect(result).toEqual({
            id: expect.any(String),
            fullName: createUserRequest.fullName,
            email: createUserRequest.email,
            balance: createUserRequest.balance,
            document: createUserRequest.document,
            isSeller: createUserRequest.isSeller
        });
    });

    it("should thrown an error when user already exists", async () => {
        const inputUser = {
            id: "",
            fullName: "Vinicius",
            email: "vinicius@gmail.com",
            password: "password",
            balance: 5000,
            document: "12345678910",
            isSeller: false
        };

        findUser.execute.mockResolvedValue(inputUser);

        const result = await createUserUseCase.execute(createUserRequest);

        expect(result).toBeInstanceOf(AlreadyExist);
    });
});