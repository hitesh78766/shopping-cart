import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
// import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addToCart = (product) => {
    console.log("Adding product to cart:", product);

    setCartItems((prevCartItems) =>
      prevCartItems.find((prev) => prev.id === product.id)
        ? prevCartItems.map((prev) => prev.id === product.id ? { ...prev, quantity: prev.quantity + 1 } : prev)
        : [...prevCartItems, { ...product, quantity: 1 }]
    );
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='loading-container'>
            <div className='loading'>Loading...</div>
        </div>       
      ) : (
        <div className='header'>
          <h3 className='' style={{ color: "white" }}>Shopping-Cart</h3>
          {cartItems.length === 0 ? (
            <div className='cart-btn'>
              <button className='btn' onClick={toggleSidebar}>
                <svg class="icon icon-cart" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className='svg-icon'>
                  <path fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className='cart-btn'>
              <button className='btn' onClick={toggleSidebar}>
                <svg class="icon icon-cart" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className='svg-icon'>
                  <path fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"></path>
                </svg>
                <span className='length'>{cartItems.length}</span>
              </button>
            </div>
          )}
        </div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} cartItems={cartItems} setCartItems={setCartItems} />
      
      <div className='main'>
        <div className='main-content'>
          {products.map((item) => (
            <Card key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;








