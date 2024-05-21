import {fastify, FastifyInstance, FastifyServerOptions} from "fastify";

export const build = async (): Promise<FastifyInstance> => {
    const options: FastifyServerOptions = {
        logger: true
    };

    const app: FastifyInstance = fastify(options);

    return app;
};