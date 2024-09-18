import React, { useEffect, useState } from 'react';

export const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState(0); // Total purchase till now

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let email = localStorage.getItem('userEmail');
        let response = await fetch('http://localhost:5000/api/MyOrderedData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        let result = await response.json();
        setOrderData(result.orderData.orders); // orders is an array from the DB structure

        // Calculate the total purchase till now
        let total = result.orderData.orders.reduce((totalSum, order) => {
          const orderTotal = order.order_data.reduce((sum, item) => sum + item.price * item.qty, 0);
          return totalSum + orderTotal;
        }, 0);
        setTotalPurchase(total);

      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4 ">
      <h1 className="text-center fontCapslocal">My Orders</h1>
      {orderData.length === 0 ? (
        <p className="text-center">No orders yet!</p>
      ) : (
        <>
          {orderData.map((order, index) => {
            // Calculate the total purchase for the current order (on a specific day)
            const orderTotal = order.order_data.reduce((sum, item) => sum + item.price * item.qty, 0);

            return (
              <div key={index} className="order mb-4">
                <h2 className="text-center">Order Date: {order.order_date}</h2>
                <hr />
                <p className="text-center fontCapslocal">Total Purchase on {order.order_date}: ₹{orderTotal}</p> {/* Total for that day */}

                <table className="table table-responsive table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Size</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_data.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.size}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </>
      )}
      <p className="text-center font-weight-bold fontCapslocal">Total Purchase Till Now: ₹{totalPurchase}</p>
    </div>
  );
};
