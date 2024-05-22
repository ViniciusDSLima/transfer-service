import {FindUser} from "../usecases/findUser/findUser.usecase";
import {UserRepository} from "../../../domain/user/repository/user.repository";

export function FindUserFactory(): FindUser {
    return new FindUser(
        new UserRepository()
    );
}