import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});

fastify.get("/", function (req, reply) {
    reply.send("Hello World!");
});

fastify.listen({port: 3000}, function (err, address) {
    if (err) {
        console.log(`Error on route get ${err}`);
        process.exit(1);
    }

    console.log("Server listening on port 3000");
});