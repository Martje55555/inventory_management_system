import React, { useState } from 'react'
import axios from 'axios';

const ShipmentCard = ({ url, id, inventory, name, date_created, last_updated, data }) => {

    const createdAt = new Date(date_created);
    const createdDate = createdAt.toLocaleDateString('en-US');

    const updatedAt = new Date(last_updated);
    const updatedDate = updatedAt.toLocaleDateString('en-US');

    let items_list = [];

    for (let i = 0; i < data.items.length; i++) {
        if (id === data.ship_id) {
            items_list.push({ "item": data.items[i].item, "amount": data.items[i].amount });
        };
    };

    const handleDelete = async () => {
        console.log('deleted');
        await axios.delete(`${url}/delete_shipment/${id}`, { crossDomain: true });
    };

    return (
        <div className='ui card'>
            <div className='content'>
                <div className='header'>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                {
                    items_list.map((e) => {
                        return (
                            <div key={e.item} className='Price' style={{ marginTop: '5px' }}>
                                <b>Item:</b> {e.item + '\t\n'}
                                <b>Amount:</b> {e.amount}
                            </div>
                        )
                    })
                }

                <div className='Amount' style={{ marginTop: '5px' }}>
                    <b>Items in Shipment:</b> {inventory}
                </div>
                <div className='meta'>
                    <span className='date'>Date Created: {createdDate}</span>
                    <br />
                    <span className='date'>Last Updated: {updatedDate}</span>
                </div>
            </div>
            <div className='extra'>
                <a style={{ marginRight: "8px", color: "red" }} onClick={handleDelete}>DELETE</a>
            </div>
        </div>
    );
};

export default ShipmentCard;
