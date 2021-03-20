import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer.js";
import { db } from "./firebase.js";
import moment from 'moment'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [amount, dispatch1] = useState(getBasketTotal(basket));
  const history = useHistory();
    const stripe = useStripe();
  const elements = useElements();
   const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
     const payment = () => {
    console.log(user);

    console.log(getBasketTotal(), amount);

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .doc(`${user?.uid}${Math.floor(Math.random() * 1000000000)}`)
      .set({
        basket: basket,
        amount: amount,
        created: new Date(),
      })
      .then(() => {
        console.log("done");
        dispatch({
          type: "EMPTY_BASKET",
        });
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
    }, 2000);
    setTimeout(() => {
      history.replace("/orders");
    }, 2000);
    payment();
  };
  const handleChange = () => {
    setDisabled(false);
  };
  return (
    <div className='Payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 hari street</p>
            <p>courtallam,tamil nadu</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hide={false}
              />
            ))}
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>
                      Order Total: <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  onClick={handleSubmit}>
                  <span>{processing ? <p>Processing..</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
