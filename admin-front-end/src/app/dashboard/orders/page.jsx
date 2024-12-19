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
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!isConfirmed) return; // Хэрэв хэрэглэгч "Cancel" товчийг дарвал устгах үйлдэл хийгдэхгүй.

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
        alert("Order deleted successfully!");
      } else {
        alert("Failed to delete the order.");
      }
    } catch (error) {
      console.log("Error deleting the order:", error);
      alert("An error occurred while deleting the order.");
    }
  };

  return (
    <div className="w-full flex justify-center py-14">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.fullname}</td>
                <td>{order.country}</td>
                <td>{order.email}</td>
                <td>+{order.phone}</td>
                <td>{order.startdate}</td>
                <td>{order.enddate}</td>
                <td>{order.totalamount}</td>
                <td>{order.personNumber}</td>
                <td className="overflow-x-scroll">{order.questions}</td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
