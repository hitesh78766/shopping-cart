import React, { useState, useEffect } from "react";

const Sidebar = ({ isOpen, onClose, cartItems, setCartItems, totalPrice }) => {

    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        const updatedItemQuantities = {};
        cartItems.forEach((prev) => {
            updatedItemQuantities[prev.id] = prev.quantity;
        });
        setItemQuantities(updatedItemQuantities);
    }, [cartItems]);


    const increaseQuantity = (id) => {
        setItemQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1, 
        }));
        setCartItems((prevCartItems) =>
            prevCartItems.map((prev) =>
                prev.id === id ? { ...prev, quantity: (prev.quantity || 0) + 1 } : prev
            )
        );
    };


    const decreaseQuantity = (id) => {
        setItemQuantities((prev) => ({
            ...prev,
            [id]: prev[id] && prev[id] > 1 ? prev[id] - 1 : prev[id]
        }));
        setCartItems((prevCartItems) =>
            prevCartItems.map((prev) =>
                prev.id === id ? { ...prev, quantity: (prev.quantity || 0) - 1 } : prev
            )
        );
    };

    const clearAll = () => {
        setCartItems([]);
    };

    const hadnleDelete = (id) => {
        // setCardItems(cardItems.filter((item) => item.id !== id));
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce((total, item) => total + (item.price * (itemQuantities[item.id])), 0);


    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                <div className="sidebar-header">
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                    <button className="clear-btn" onClick={clearAll}>
                        Clear all Items
                    </button>
                </div>

                <div className="sidebar-content">
                    {cartItems.length === 0 ? <p style={{ textAlign: "center", marginTop: "10%", color: "red" }}>No items in the cart</p> :
                        <div>
                            {cartItems.map((item) => (
                                <div className="item" key={item.id}>
                                    <div className="item-details">
                                        <div className="">
                                            <img src={item.image} alt="" />
                                        </div>
                                        
                                        <div className="">
                                            <p>{item.name}</p>
                                            {/* <b><p>{item.price * (itemQuantities[item.id] || 1)}</p></b> */}
                                            <b><p>{`${item.price} * ${itemQuantities[item.id] || 1} = ${item.price * (itemQuantities[item.id] || 1)}`}</p></b>
                                        </div>

                                    </div>
                                    <div className="quantity-btn">
                                        <button onClick={() => decreaseQuantity(item.id)} disabled={itemQuantities[item.id] === 1}>-</button>
                                        <button> {item.quantity || itemQuantities[item.id] || 1} Qty.</button>
                                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        <button style={{ color: "red" }} onClick={() => hadnleDelete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>

                <div className="" style={{ marginTop: "10px" }}>
                    <b><p>The Total Length of your card is : {cartItems.length} </p></b>
                    <b><p>The Total price of your card is : {total}</p></b>
                </div>

            </div>
        </>
    );
};

export default Sidebar;


//   const hadnleDelete = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//     setItemQuantities((prev) => {
//       const updatedQuantities = { ...prev };
//       delete updatedQuantities[id];
//       return updatedQuantities;
//     });
//   };
