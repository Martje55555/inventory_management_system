# Fall 2022 - Shopify Developer Intern Challenge Question

## App Feautures
* CRUD funcionalities for the inventory:
   * Create Inventory Items
   * Edit Them
   * Delete Them
   * View a list of them
* Ability to create “shipments” and assign inventory to the shipment, and adjust inventory appropriately

## Pre-reqs:
This challenge was tackled using Node.js and Postgres, for the backend, and React.js for the front-end.

### Steps:
* Clone the repository [Link](https://github.com/Martje55555/Fall-2022-Shopify-Intern-Challenge)

### Setup Postgres

* Download Postgres 
    * [MacOS](https://www.postgresql.org/download/macosx/)
    * [Windows](https://www.postgresql.org/download/windows/)

**Note** - For most systems, the default Postgres user is `postgres`.

In the `postgres_setup` folder you will find a file with the queries needed to create the database structure. Such as, the schema, and the required tables. You can run postgres queries and view your tables via the command line, or with a GUI. I use [PgAdmin](https://www.pgadmin.org/download/) to better visualize things and make navigating the database easier.

### Setup the API
   * `cd` into the `api` directory.
   * Run `npm install`
   * Run `npm start` to start the api so that the server is now listening for requests.

<img width="309" alt="image" src="https://user-images.githubusercontent.com/71607977/169715904-ed96ce23-d99a-4a39-a34b-a90fdc389f3a.png">

In the `index.js` you will find the file where the server is set up listening to requests on port 8080. Here is also where the different endpoints are defined and other information needed to have a connection with the postgres database. 

Here is a link to a postman collection, where I tested the different endpoints - https://www.getpostman.com/collections/046b3f859e1aade1b581

### Setup the CLIENT
   * `cd` into the 'client' directory.
   * Run `npm install`
   * Run `npm start` to start the client.
 <img width="1303" alt="image" src="https://user-images.githubusercontent.com/71607977/169715975-1069d219-0d47-4d37-81cc-66943d2a4692.png">
 
 In the `src/components` directory is where all the different pages/components for the client lives.
