import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToCart = (product) => {
    console.log("Adding product to cart:", product);

    if (cartItems.find((prev) => prev.id === product.id)) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((prev) =>
          prev.id === product.id ? { ...prev, quantity: prev.quantity + 1 } : prev
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }


    // Calculate total price
    // const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    // setTotalPrice(totalPrice);
  };

  const products = [
    {
      id: 1,
      name: "HP 15s Intel Core i3 12th Gen 1215U",
      price: 42699,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/h/a/o/-original-imagykgpg4rt5kxm.jpeg?q=70"
    },
    {
      id: 2,
      name: "EAST COAST Premium City Bike/cycle 26t",
      price: 4499,
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/cycle/z/0/s/premium-city-bike-cycle-26t-with-inbuilt-carrier-26-18-east-original-imagxhg7r5gfzqwx.jpeg?q=70"
    }
  ];

  return (
    <>
      <div className='header'>
        <div>
          <h3 className='' style={{ color: "white" }}>Shopping-Cart</h3>
        </div>
        <div className='cart-btn'>
          <button className='btn' onClick={toggleSidebar}>Cart {cartItems.length}</button>
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} cartItems={cartItems} setCartItems={setCartItems}  />

      <div className='main'>
        <div className='main-content'>
          {products.map((item) => (
            <div className='card' key={item.id}>
              <img src={item.image} alt="" />
              <div className='container'>
                <p>{item.name}</p>
                <h4>{item.price}</h4>
                <button onClick={() => addToCart(item)}>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;


 

  





