import {IUserRepository} from "../../../../domain/user/repository/userRepository.interface";
import {InputUserDTO, OutputUserDTO} from "../dto/user.dto";
import {FindUserInterface} from "../../interface/findUser.Interface";
import {UserFactory} from "../../../../domain/user/factory/user.factory";
import {generateUniqueId} from "../../../../infrastructure/utils/generateUniqueId";
import {AlreadyExist} from "../../../../domain/errors/implementations/alreadyExist.error";

export class CreateUserUseCase {

    private _userRepository: IUserRepository;
    private _findUserByEmail: FindUserInterface;

    constructor(userRepository: IUserRepository, findUserByEmail: FindUserInterface) {
        this._userRepository = userRepository;
        this._findUserByEmail = findUserByEmail;
    }

    public async execute(input: InputUserDTO): Promise<OutputUserDTO | Error> {
        const userExists = await this._findUserByEmail.execute(input.email);

        if (userExists){
            return new AlreadyExist("User already exists");
        }

        const userCreate = UserFactory.create({
            id: generateUniqueId(),
            fullName: input.fullName,
            document: input.document,
            email: input.email,
            password: input.password,
            isSeller: input.isSeller,
            balance: input.balance
        });

        userCreate.hashPassword();

        await this._userRepository.create(userCreate);

        return {
            id: userCreate.id,
            fullName: userCreate.fullName,
            document: userCreate.document,
            balance: userCreate.balance,
            isSeller: userCreate.isSeller,
            email: userCreate.email
        };
    }
}