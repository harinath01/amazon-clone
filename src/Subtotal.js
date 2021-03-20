import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer.js";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./Subtotal.css";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={() => { history.push('/payment')}}>proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
