import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "./reducer";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const extra = basket.length;
  const ticketNotVisibleState = {
    transform: "translateX(100%)",
    opacity: 0.1,
  };

  return (
    <div className={`checkout  ${extra && "extraa"}`}>
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Fashion/WA19/ILM/640x45._CB445198997_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">
            {basket.length
              ? "Your shopping Basket"
              : "Your Shopping basket is Empty"}
          </h2>

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
              //weapperless mode for FlipMove (React 16+)

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
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
