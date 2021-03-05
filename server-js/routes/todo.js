const express = require('express');
const router = express.Router();
const { Client } = require('pg');

/* get all todo lists. */
router.get('/', async function(req, res) {
    const result = await makeSqlRequest("SELECT list_id, name FROM Lists ORDER BY list_id")
    res.send(result.rows);
});

/* get todo list by id. */
router.get('/list/:id', async function(req, res) {
    const result = await makeSqlRequest("SELECT todo_id, name, completed FROM Todos WHERE list_id = $1 ORDER BY todo_id", [req.params.id]);
    res.send(result.rows);
});

/* add todo list. */
router.post('/', async function(req, res) {
    await makeSqlRequest("INSERT INTO Lists (name) VALUES ($1)", [req.body.name]);
    res.redirect(303, '/');
});

/* add todo to todo list. */
router.post('/list/:id', async function(req, res) {
    await makeSqlRequest("INSERT INTO Todos (list_id, name) VALUES ($1, $2)", [req.params.id, req.body.name]);
    res.redirect(303, '/todo/' + req.params.id);
});

/* delete todo list by id. */
router.delete('/list/:id', async function(req, res) {
    await makeSqlRequest("DELETE FROM Lists WHERE list_id = $1", [req.params.id]);
    res.sendStatus(200);
});

/* mark todo as @completed */
router.post('/list/:id/mark', async function(req, res) {
    await makeSqlRequest("UPDATE Todos SET completed = $3 WHERE list_id = $1 AND todo_id = $2", [req.params.id, req.body.todo_id, req.body.completed]);
    res.sendStatus(200);
});

async function makeSqlRequest(query, params) {
    const client = new Client(process.env.DATABASE);
    await client.connect();
    const result = await client.query(query, params);
    await client.end();
    return result;
}

module.exports = router;
