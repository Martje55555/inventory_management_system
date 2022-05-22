import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InventoryCard from './InventoryCard.js';
import NavBar from './navBar.js';
import Form from './Form.js';

const Inventory = () => {

    const url = 'http://localhost:8080';

    const [inventory, setInventory] = useState([
        { id: 1, name: 'Toilet Paper', created_at: '5-15-2022', price: 5.99, inventory: 43, updated_at: '5-17-2022' },
        { id: 2, name: 'Water', created_at: '6-12-2021', price: 3.99, inventory: 42, updated_at: '7-15-2022' },
        { id: 3, name: 'Milk', created_at: '4-12-2022', price: 6.94, inventory: 46, updated_at: '5-17-2022' },
        { id: 4, name: 'Wine', created_at: '5-14-2022', price: 4.22, inventory: 52, updated_at: '6-17-2022' }
    ]);

    const [showForm, setShowForm] = useState(false);

    const getInventory = async () => {
        await axios.get(`${url}/items`, { crossDomain: true })
            .then((response) => {
                setInventory(response.data);
            });
    };

    const handleCreate = async () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        getInventory();
    }, []);

    return (
        <>
            <NavBar />
            <h1>Inventory</h1>
            <center>
                <button style={{ marginBottom: '10px' }} onClick={handleCreate}>Create New Item</button>
                {showForm ? <Form url={url} setShowForm={setShowForm} showForm={showForm} /> :
                    inventory.map((e) => {
                        return (
                            <div key={e.id}>
                                <InventoryCard url={url} id={e.id} amount={e.inventory} name={e.name} date_created={e.created_at} last_updated={e.updated_at} price={e.price} />
                            </div>
                        );
                    })}
            </center>
        </>
    );
};

export default Inventory;
