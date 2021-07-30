import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//public key, no need for .gitignore
const promise = loadStripe(
  "pk_test_51HT8gOByAlmVqj2uPZy4JPGY98PEAGJJLhBPUexST8N68l22GxbhiTiHmjeFTjxIbTGejkK8RWsMHUPGaBPLPTxE00MtLDvl3C"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //Will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS ---- ", authUser);

      if (authUser) {
        //The user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
