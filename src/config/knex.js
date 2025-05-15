const Knex = require('knex');

const db = Knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Wikipedi@123',
        database: process.env.DB_NAME || 'pethub',
    },
})

module.exports = db;