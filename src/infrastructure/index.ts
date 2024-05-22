import Fastify from "fastify";
import {userRoutes} from "./api/routes/user/user.routes";
import {transferRouter} from "./api/routes/transfer/transfer.routes";

const fastify = Fastify({
    logger: true
});
const server = async() => {

    const optionsObject = {
        port: Number(process.env.PORT) || 3000,
        host: "0.0.0.0"
    };

    await userRoutes(fastify, optionsObject);

    await transferRouter(fastify, optionsObject);

    await fastify.listen(optionsObject);
};

server();