import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useIncludeCart } from './ContextReducer'; // Adjust the path as needed

export const Cards = (props) => {
  const dispatch = useDispatchCart(); // Retrieve dispatch function
  const data = useIncludeCart(); // Retrieve cart data
  const priceRef = useRef();
  const options = props.foodOption;
  const foodDeliveryOptions = Object.keys(options || {});
  const foodItem = props.filteredItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem('authToken'); // Correctly retrieve the authToken
    if (authToken === null) {
      alert('Please login first.');
      return; // Exit the function if not logged in
    }
    else{
    let food = data.find(item => item.id === foodItem._id && item.size === size);
    let finalPrice = qty * parseInt(options[size]);

    if (food) {
      // If the same item with the same size exists, update quantity and price
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size });
    } else {
      // If the item is not in the cart, add it
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        size: size,
        qty: qty,
        img: foodItem.img,
      });
    }
  }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // Ensure finalPrice is recalculated whenever qty or size changes
  let finalPrice = qty * parseInt(options[size] || 0);

  return (
    <div className="card mt-3 shadow bg-slate-500" style={{ width: "100%", maxWidth: "18rem", minWidth: "13rem" }}>
      <img src={foodItem.img} className="card-img-top" style={{ maxHeight: "250px", minHeight: "249px", objectFit: 'cover' }} alt="Food item" />
      <div className="card-body .fontCapslocal">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">{foodItem.description}</p>
        <div className="container w-100">
          <select name="quantity" className="m-2 h-100 w-40 bg-success rounded" id="quantitySelect" onChange={(e) => setQty(e.target.value)} value={qty}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="m-2 h-100 w-50 bg-success rounded" id="sizeSelect" ref={priceRef} onChange={(e) => setSize(e.target.value)} value={size}>
            {foodDeliveryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
        </div>
        <hr />
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
