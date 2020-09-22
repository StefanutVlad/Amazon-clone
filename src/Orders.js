import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Orders.css";
import Order from "./Order";

function Orders() {
  //states
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  //hooks
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(
          snapshot => (//updates the db real time if we add/remove a value
            setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]); //the empty brakets means runs only once

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
