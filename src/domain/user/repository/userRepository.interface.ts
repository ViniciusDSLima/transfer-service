import {User} from "../entity/user.entity";

export interface IUserRepository {
    create(input: User): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}