import {IUserRepository} from "../../../../domain/user/repository/userRepository.interface";
import {verifyBalanceInputDto, verifyBalanceOutputDto} from "../dto/balance.dto";

export class VerifyBalanceUseCase {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    public async execute(input: verifyBalanceInputDto): Promise<verifyBalanceOutputDto | undefined> {
       const user = await this._userRepository.findById(input.senderId);

       if (!user) {
           return undefined;
       }

       const isValid = user.balance >= input.balance;

       return {
           isValid
       };
    }
}