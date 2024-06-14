import {FastifyInstance, FastifyPluginAsync} from "fastify";
import {CreateUserUseCase} from "../../../../application/user/usecases/create/createUser.usecase";
import {UserRepository} from "../../../../domain/user/repository/user.repository";
import {InputUserDTO} from "../../../../application/user/usecases/dto/user.dto";
import {FindUserFactory} from "../../../../application/user/factory/findUser.factory";

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post(
        "/createUser", async (req,reply) => {
            const createUserUseCase = new CreateUserUseCase(new UserRepository(), FindUserFactory());

                 const data = req.body as InputUserDTO;

                 await createUserUseCase.execute(data);

                 reply.code(201).send({output: data});
        }
    );
};