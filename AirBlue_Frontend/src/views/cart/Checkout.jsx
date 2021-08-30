import React, { useState,Component } from "react";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { Link } from "react-router-dom";
import {
  useMutation,
  gql
} from "@apollo/client";

const CheckoutView = props =>{
  var path = window.location.href
  var n = path.lastIndexOf("/");
  var m = path.lastIndexOf("?");
  var user = path.substring(n+1, m);
  var total = path.substring(m+1);
  const EDIT_USER_MILES = gql`
    mutation updateMiles(
        $miles: Int!
        $user: String!
        ){
          updateMiles(
            input: {
              miles: $miles
            user: $user
            }
        ) {
          milesDetails {
          miles
        }
        }
    }
    `

    const CLEAR_USER_CART = gql`
    mutation clearCart(
        $user: String!
        ){
          clearCart(
            input: {
            user: $user
            }
        ) {
          cart {
            name
          }
        }
    }
    `
    const [profileState, setProfileState] = useState(props);
    console.log(profileState)
    const [editMiles, { data, loading, error }] = useMutation(EDIT_USER_MILES);
    const [clearCart, { cdata, cloading, cerror }] = useMutation(CLEAR_USER_CART);

    const edit = () => {
      editMiles({variables: {
        miles: total,
        user: user
      }});

      clearCart({variables: {
        user: user
      }});
      window.location.reload(false);
    }
  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">

            <div className="card mb-3">
              <div className="card-header">
                <IconReceipt className="i-va" /> Billing Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <IconCreditCard2Front className="i-va" /> Payment Method
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                        <img
                          src="../../images/payment/cards.webp"
                          alt="..."
                          className="ml-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img
                          src="../../images/payment/paypal_64.webp"
                          alt="..."
                          className="ml-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        AirMiles
                        <img
                          src="../../images/payment/miles.png"
                          alt="..."
                          className="ml-3"
                          height={40}
                        />
                      </label>
                    </div>
                  </div>
              </div>
              <div className="card-footer border-info">
                <button type="button" className="btn btn-block btn-info" onClick={() => {edit()}}>
                <Link to={{
        pathname: `/cart/${user}`,
        state: { authenticated: true }
      }} className="btn btn-primary float-right">
                  Pay Now: <b>{total} ams </b>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckoutView;
