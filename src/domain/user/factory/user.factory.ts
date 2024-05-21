import {User} from "../entity/user.entity";
import {InputUserDTO} from "../../../application/user/usecases/dto/user.dto";

export class UserFactory {
    public static create(input: InputUserDTO): User {
        return new User({
            id: input.id,
            document: input.document,
            email: input.email,
            password: input.password,
            fullName: input.fullName,
            isSeller: input.isSeller,
            balance: input.balance,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
}