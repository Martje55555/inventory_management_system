const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;

const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '',
    port: 5432,
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// create a route for the app
app.get('/', (req, res) => {
    res.send('Hello World');
});

// CREATE item
app.post('/create_item', async (req, res) => {
    let query = `
INSERT into inventory.items(name, price, inventory)
VALUES ('${req.body.name}', ${req.body.price}, ${req.body.inventory})
`;

    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json(err);
    };
});

// READ items
app.get('/items', async (req, res) => {
    let query = `
SELECT * FROM inventory.items
`;
    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(404).json(err);
    };
});

// UPDATE item
app.put('/update_item/:id', async (req, res) => {
    let query = `
UPDATE inventory.items
SET name = '${req.body.name}', price = ${req.body.price}, inventory = ${req.body.inventory}, updated_at = now()
WHERE id = ${req.params.id};
`;
    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json(err);
    };
});

// DELETE item
app.delete('/delete_item/:id', async (req, res) => {
    let query = `
DELETE FROM inventory.items
WHERE id = ${req.params.id}
`;
    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json(err);
    };
});

/////// SHIPMENT ////////

// CREATE a Shipment
app.post('/create_shipment', async (req, res) => {
    let response;
    try {

        // this code snippet updates the inventory on the inventory table
        for (var key in req.body.itemsList) {
            let updateInventoryQuery = `
                UPDATE inventory.items
                SET inventory = inventory - ${parseInt(req.body.itemsList[key].amount)}
                WHERE inventory != 0 AND inventory - ${parseInt(req.body.itemsList[key].amount)} >= 0
                AND name = '${req.body.itemsList[key].name}'
                `;
            await client.query(updateInventoryQuery);
        };

        let query = `
            INSERT into inventory.shipments(name, items, inventory)
            VALUES ('${req.body.name}', '${req.body.items}', ${req.body.inventory})
            `;

        response = await client.query(query);

        res.status(200).json(response);
    } catch (err) {
        res.status(404).json(err);
    };
});

// TO DO
app.put('/update_shipment/:id', async (req, res) => {
    
});

// GET list of shipments
app.get('/shipments', async (req, res) => {
    let query = `
    SELECT * FROM inventory.shipments
    `;
    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(404).json(err);
    };
});

// DELETE shipment
app.delete('/delete_shipment/:id', async (req, res) => {
    let query = `
DELETE FROM inventory.shipments
WHERE ship_id = ${req.params.id}
`;
    let response;
    try {
        response = await client.query(query);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json(err);
    };
});

// Close Postgres Connection
app.get('/closeConnection', (req, res) => {
    client.end();
    res.status(200).send('Connection closed');
});

// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});
