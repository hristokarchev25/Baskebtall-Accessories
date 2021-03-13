const config = {
    development: {
        PORT: 2000,
        SALT_ROUNDS: 10,
        SECRET: 'superSecret',
        COOKIE_NAME: 'IcoTheCookie',
    },
    production: {
        PORT: 80,
    }
};

module.exports = config[process.env.NODE_ENV.trim()]