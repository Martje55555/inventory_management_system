import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ShipmentForm from './ShipmentForm';
import NavBar from "./navBar";
import ShipmentCard from './ShipmentCard';

const Shipments = () => {

    const url = 'http://localhost:8080';

    const [showForm, setShowForm] = useState(false);

    const [shipments, setShipments] = useState([
        
    ]);

    const [inventory, setInventory] = useState([
        
    ]);

    const getShipments = async () => {
        await axios.get(`${url}/shipments`, { crossDomain: true })
            .then((response) => {
                setShipments(response.data);
            });
    };

    const getInventory = async () => {
        await axios.get(`${url}/items`, { crossDomain: true })
            .then((response) => {
                setInventory(response.data);
            });
    };

    const handleCreate = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        getInventory();
        getShipments();
    }, []);

    return (
        <>
            <NavBar />
            <h1>Shipments</h1>
            <center>
                <button style={{ marginBottom: '10px' }} onClick={handleCreate}>Add New Shipment</button>
                <>
                    {showForm ? <ShipmentForm
                        url={url}
                        inventory={inventory}
                        setShowForm={setShowForm}
                        showForm={showForm}
                    /> :
                        shipments.map((e) => {
                            return (
                                <div key={e.ship_id}>
                                    <ShipmentCard
                                        url={url}
                                        id={e.ship_id}
                                        inventory={e.inventory}
                                        setShowForm={setShowForm}
                                        showForm={showForm}
                                        name={e.name}
                                        date_created={e.created_at}
                                        last_updated={e.updated_at}
                                        data={e}
                                    />
                                </div>
                            );
                        })
                    }
                </>
            </center>
        </>
    );
};

export default Shipments;
