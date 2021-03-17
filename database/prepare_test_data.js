const { Client } = require('pg');
var fs = require('fs');

async function createTestDatabase() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: 'postgres',
        password: 'postgres',
        database: 'todo_managertest'
    });
    var sql = fs.readFileSync('schema.sql').toString() + fs.readFileSync('test_data.sql').toString();
    await client.connect().catch(err => console.error('connection error', err.stack));
    await client.query(sql).catch(err => console.error('error during query', err.stack))
    await client.end();
}

createTestDatabase();