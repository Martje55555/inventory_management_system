const { Client } = require('pg');

var client = new Client({
  connectionString: 'postgres://ywcoprrz:xtbHw7OADMzXpC7H-qRQ141tXnTYwrtS@drona.db.elephantsql.com/ywcoprrz',
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()
  .then(() => console.log("connected"))
  .catch(e => console.log)
  .finally(() => {
    client.query(`
      CREATE SCHEMA inventory
      create table inventory.items (
        id serial primary key,
        name varchar(200),
        price NUMERIC,
        inventory integer,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      create table inventory.shipments (
        ship_id serial primary key,
        name varchar(200),
        items JSONB,
        inventory integer,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );`,
      (err) => {
      if (err) {
        throw err
      } else {
        console.log("SUCCESSFUL")
      }
      client.end();
    });
  })