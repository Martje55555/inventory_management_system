const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

let query = `
SELECT * FROM "public"."test_table"
`;

const getAllUsers = (request, response) => {
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Table is successfully created');
        response.status(200).json(res.rows);
    });
};

const endConnection = () => {
    client.end();
    response.status(200).send('Connection closed');
};

module.exports = getAllUsers, endConnection;