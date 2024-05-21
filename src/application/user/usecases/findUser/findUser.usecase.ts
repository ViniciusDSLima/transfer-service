import {IUserRepository} from "../../../../domain/user/repository/userRepository.interface";
import {OutputUserDTO} from "../dto/user.dto";
import {FindUserInterface} from "../../interface/findUser.Interface";

export class FindUser implements FindUserInterface {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    public async execute(input: string): Promise<OutputUserDTO | undefined> {

        const userEmail = await this._userRepository.findByEmail(input);

        if (userEmail) {
            return userEmail;
        }

        const userId = await this._userRepository.findById(input);

        if (!userId) {
            return undefined;
        }

        return userId;
    }
}