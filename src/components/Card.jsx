const Card = ({ item, addToCart }) => 
{
    return (
        <div className='card' key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className='container'>
                <p>{item.category}</p>
                {/* <p>{item.title}</p> */}
                <p>{item.rating.rate}</p>
                <h4>{item.price}</h4>
                <button onClick={() => addToCart(item)}>Add To Cart</button>
            </div>
        </div>
    );
};

export default Card