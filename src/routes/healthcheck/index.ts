export default async function(fastify) {
    fastify.get('/', (req, rep) => {
        rep.send({
            ok: true,
        })
    })
}
