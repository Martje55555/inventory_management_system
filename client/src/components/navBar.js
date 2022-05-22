import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const Navigate = useNavigate();
    const [inventoryActive, setInventoryActive] = useState(false);
    const [shipmentsActive, setShipmentsActive] = useState(false);

    const inventory = () => {
        Navigate('/inventory', { replace: true });
        setInventoryActive(!inventoryActive);
        setShipmentsActive(false);
    };

    const shipments = () => {
        Navigate('/shipments', { replace: true });
        setInventoryActive(false);
        setShipmentsActive(!shipmentsActive);
    };

    return (
        <div className="ui fluid two item menu ar">
            <a onClick={() => inventory()}
                className={inventoryActive ? "item active historical" : "item"}>
                Inventory
            </a>

            <a onClick={() => shipments()}
                className={shipmentsActive ? "item active control" : "item"}>
                Shipments
            </a>

        </div>
    )
}

export default NavBar;