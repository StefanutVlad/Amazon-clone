import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  //hooks
  const [{ basket, user }, dispatch] = useStateValue();
  const ticketNotVisibleState = {
    transform: "translateX(100%)",
    opacity: 0.1,
  };
  const history = useHistory();

  //payment hooks
  const stripe = useStripe();
  const elements = useElements();

  //states
  const [succeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  //Loads with the Payment component && when the dependencies change(the basket)
  useEffect(() => {
    //generate the special stripe secret => allows to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in subunits (it uses subunits for $, so *100 to get the correct value)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      //set the response
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>", clientSecret);
  //Stripe code
  const handleSubmit = async (event) => {
    //Stop if from refreshing
    event.preventDefault();
    //In order to click the 'buy button only once
    setProcessing(true);

    //confirming the payment using the clientSecret(how much to charge the client)
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentItems = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        //swap the page, not push
        history.replace("/orders");
      });
  };

  //Listen for changes in CardElement & display the card details errors
  const handleChange = (event) => {
    //if the event is empty => disable the button
    setDisabled(event.empty);
    //if there's an error => show the error : nothing
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout"> {basket?.length} items</Link>){" "}
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>100 React</p>
            <p>Cluj-Napoca, RO</p>
          </div>
        </div>
        {/* Payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <FlipMove
              duration={500}
              staggerDurationBy="30"
              easing="ease-out"
              enterAnimationenterAnimation={{
                from: ticketNotVisibleState,
                to: {},
              }}
              leaveAnimation={{
                from: {},
                to: ticketNotVisibleState,
              }}
            >
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {/* Payment section - payment method */}

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* Stripe code */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* If there is an error, show it */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
