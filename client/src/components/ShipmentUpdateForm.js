import React, { useState } from "react";
import axios from "axios";

const ShipmentUpdateForm = ({ url, inventory, setShowForm, showForm, ship_id }) => {

    const [formValue, setformValue] = useState({
        name: '',
    });

    let listOfId = [];
    let itemsList = {};
    let inventorySize = 0;
    let isCheckedList = {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        let items = {};

        for (var key in isCheckedList) {
            if (isCheckedList[key].checked === true) {
                let temp = isCheckedList[key];
                temp = temp["id"];
                listOfId.push(temp);
            };
        };

        let index = 0;

        for (var key in itemsList) {
            if (isCheckedList[key].checked === true) {
                items[index++] = { "name": key, "amount": itemsList[key] }
            };
        };

        let itemQuery = `[ { "item": "${items[0].name}", "amount": ${items[0].amount} }`;
        inventorySize += parseInt(items[0].amount);

        for (var key in items) {
            if (key > 0) {
                itemQuery += `, { "item": "${items[key].name}", "amount": ${items[key].amount} }`;
                inventorySize += parseInt(items[key].amount);
            };
        };

        itemQuery += ' ]';

        await axios.post(`${url}/create_shipment`, {
            itemsList: items,
            name: formValue.name,
            items: itemQuery,
            inventory: inventorySize
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response);
        });

        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setformValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleCheck = (event, id, name, type) => {
        let isChecked = event.target.checked;
        let exists = false;

        for (var key in isCheckedList) {
            if (key === name && type === 'check') {
                exists = true;
                isCheckedList[key] = { "id": id, "checked": isChecked };
            } else if (key === name && type === 'handleNumber') {
                exists = true;
            };
        };

        if (exists === false) {
            isCheckedList[name] = { "id": id, "checked": isChecked };
        };
    };

    const handleNumber = (event, id, name) => {
        let number = event.target.value;
        let exists = false;
        let from = 'handleNumber';

        for (var key in itemsList) {
            if (key === name) {
                exists = true;
                itemsList[key] = number;
            };
        };

        if (exists === false) {
            itemsList[name] = number;
        };

        handleCheck(event, id, name, from);
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name of Shipment:
                <input type="text" name="name" value={formValue.name} onChange={handleChange} style={{ marginBottom: "15px", marginTop: "15px" }} />
            </label>
            {
                inventory.map((e) => {
                    return (
                        <div key={e.name}>
                            <div className="ui checkbox">
                                <input type="checkbox" onChange={(event) => handleCheck(event, e.id, e.name, 'check')} />
                                <label style={{ marginRight: "15px", marginBottom: "10px" }}>{e.name}</label>
                            </div>
                            <label>
                                Number of Item:
                                <input type="number" name="amount" onChange={(event) => handleNumber(event, e.id, e.name)} />
                            </label>
                        </div>

                    );
                })
            }
            <input type="submit" />
        </form>
    );
};

export default ShipmentUpdateForm;
