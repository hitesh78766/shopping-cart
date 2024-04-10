const Sidebar = ({ isOpen, onClose, cartItems, setCartItems}) => {

    // console.log("the carditems are : ",cartItems);
    const increaseQuantity = (id) =>
    {
        setCartItems((prevCartItems) =>
            prevCartItems.map((prev) =>
                prev.id === id ? { ...prev, quantity: (prev.quantity || 0) + 1 } : prev
            )
        );
    }

    const decreaseQuantity = (id) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((prev) =>
                prev.id === id ? { ...prev, quantity: (prev.quantity || 0) - 1 } : prev
            )
        );
    }

    const clearAll = () => {
        setCartItems([]);
    };

    const handleDelete = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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
                    {cartItems.length === 0 ? <p className="empty">Your card is Empty...</p> :
                        <div>
                            {cartItems.map((item) => (
                                <div className="item" key={item.id}>
                                    <div className="item-details">
                                        <div className="">
                                            <img src={item.image} alt="" />
                                        </div>

                                        <div className="">
                                            <p>{item.category}</p>
                                            <b><p>{`${item.price} * ${item.quantity } = ${item.price * item.quantity}`}</p></b>
                                        </div>

                                    </div>
                                    <div className="quantity-btn">
                                      
                                        <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                                        <p> {item.quantity} Qty.</p>
                                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        <button onClick={() => handleDelete(item.id)}><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></button>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>

                <div className="sidebar-bottom">
                    <b><p>The Total Length of your card is : {cartItems.length} </p></b>
                    <b><p style={{marginBottom:"10px"}}>The Total price of your card is : {total}</p></b>
                </div>
            </div>
        </>
    );
};

export default Sidebar;



