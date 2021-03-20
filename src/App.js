import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider.js";
import Payment from "./Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders.js";
const promise = loadStripe(
  "pk_test_51IH1gQJxBgXFCcTjn9dj9xrMbTf3znJe421iNdR8qUkLwUE6Plp8JdpzDAivysWWVkurYynGE5OQPUf2AvKNUKs500zanLfTFf",
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path='/payment'>
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path='/orders'>
          <Orders />
        </Route>
        <Route path='/'>
          <div className='app'>
            <Home />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
