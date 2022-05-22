import React, { useState } from "react";
import axios from "axios";

const Form = ({ url, setShowForm, showForm }) => {

    const [formValue, setformValue] = useState({
        name: '',
        price: 0.0,
        inventory: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${url}/create_item`, {
            name: formValue.name,
            price: formValue.price,
            inventory: formValue.inventory
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setformValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name of Item:
                <input type="text" name="name" value={formValue.name} onChange={handleChange} />
            </label>
            <label>
                Price of Item:
                <input type="text" name="price" value={formValue.price} onChange={handleChange} />
            </label>
            <label>
                Number of Inventory:
                <input type="number" name="inventory" value={formValue.inventory} onChange={handleChange} />
            </label>
            <input type="submit" />
        </form>
    );
};

export default Form;
