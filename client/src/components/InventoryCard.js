import React, { useState } from 'react'
import axios from 'axios';

import UpdateForm from './updateForm';

const InventoryCard = ({ url, id, amount, name, date_created, last_updated, price }) => {

    const createdAt = new Date(date_created);
    const createdDate = createdAt.toLocaleDateString('en-US');

    const updatedAt = new Date(last_updated);
    const updatedDate = updatedAt.toLocaleDateString('en-US');

    const [showForm, setShowForm] = useState(false);

    const handleUpdate = () => {
        setShowForm(!showForm);
    }

    const handleDelete = async () => {
        console.log('deleted');
        await axios.delete(`${url}/delete_item/${id}`, { crossDomain: true });
    };

    return (
        <div className='ui card'>
            <div className='content'>
                <div className='header'>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                <div className='Price' style={{ marginTop: '5px' }}>
                    <b>Price:</b> {price}
                </div>
                <div className='Amount' style={{ marginTop: '5px' }}>
                    <b>Amount:</b> {amount}
                </div>
                <div className='meta'>
                    <span className='date'>Date Created: {createdDate}</span>
                    <br />
                    <span className='date'>Last Updated: {updatedDate}</span>
                </div>
            </div>
            <div className='extra'>
                <a style={{marginRight: "8px", color: "red"}} onClick={handleDelete}>DELETE</a>
                <a style={{color: "blue"}}onClick={handleUpdate}>UPDATE</a>
                {
                    showForm ? <UpdateForm
                        url={url}
                        setShowForm={setShowForm}
                        showForm={showForm}
                        id={id}
                        amount={amount}
                        name={name}
                        price={price} />
                        :
                        <>
                        </>
                }
            </div>
        </div>
    );
};

export default InventoryCard;