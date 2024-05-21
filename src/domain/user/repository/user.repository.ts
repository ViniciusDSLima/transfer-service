import {prisma} from "../../../infrastructure/utils/prisma";
import {IUserRepository} from "./userRepository.interface";
import {User} from "../entity/user.entity";
import {InternalServerError} from "../../errors/implementations/internalServer.error";

export class UserRepository implements IUserRepository {

    public async create(input: User): Promise<void> {
        try {
            await prisma.user.create({
                data: {
                    fullName: input.fullName,
                    document: input.document,
                    email: input.email,
                    password: input.password,
                    isSeller: input.isSeller
                }
            });
        } catch (error) {
            throw new InternalServerError(`Error creating user (repository) | Error: ${error}`);
        }
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user){
            return undefined;
        }

        return new User({
            id: user.id,
            document: user.document,
            email: user.email,
            fullName: user.fullName,
            isSeller: user.isSeller,
            password: user.password,
            balance: user.balance,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user){
            return undefined;
        }

        return new User({
            id: user.id,
            document: user.document,
            email: user.email,
            fullName: user.fullName,
            isSeller: user.isSeller,
            password: user.password,
            balance: user.balance,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
}