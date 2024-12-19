"use client";

import React, { useState, useEffect } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
        );
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div className="w-full flex justify-center py-14">
      {" "}
      <div className="overflow-x-auto bg-[#182237] p-3 rounded-md ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white ">
              <th></th>
              <th>Name</th>
              <th>Country</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Total amount</th>
              <th>Total people</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index}</th>
                <td>{order.fullname}</td>
                <td>{order.country}</td>
                <td>{order.email}</td>
                <td>+{order.phone}</td>
                <td>{order.startdate}</td>
                <td>{order.enddate}</td>
                <td>{order.totalamount}</td>
                <td>{order.personNumber}</td>
                <td className="overflow-x-scroll">{order.questions}</td>
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
