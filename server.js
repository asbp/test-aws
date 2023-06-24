const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route([{
        path: "/",
        method: 'GET',
        handler: (_req, h) => {
            return h.response('Mantap banget')
                .type('text/plain')
                .header('X-Custom', 'some-value');
        }
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        // eslint-disable-next-line no-unused-vars
        handler: (request, _h) => {
            const { name = "stranger" } = request.params;
            const { lang } = request.query;

            if (lang === 'id') {
                return `Hai, ${name}!`;
            }
            return `Hello, ${name}!`;
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request) => {
            const { username } = request.payload;
            return `Welcome ${username}!`;
        },
    }
    ])

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();