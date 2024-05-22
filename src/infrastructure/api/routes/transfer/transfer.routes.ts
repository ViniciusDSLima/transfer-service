import {FastifyInstance, FastifyPluginAsync} from "fastify";
import {TransferUseCase} from "../../../../application/transfers/usecases/transfer.usecase";
import {TransferRepository} from "../../../../domain/transfer/repository/transfer.repository";
import {InputTransferDTO} from "../../../../application/transfers/interface/transfer.dto";
import {FindUserFactory} from "../../../../application/user/factory/findUser.factory";

export const transferRouter: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post("/transfer",async (req, reply) => {
            const transferUseCase = new TransferUseCase(new TransferRepository(), FindUserFactory());

                const data = req.body as InputTransferDTO;

                await transferUseCase.execute(data);

                reply.code(201).send({output: data});

    });
};