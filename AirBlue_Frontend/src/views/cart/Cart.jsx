import React, { Component, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useQuery,
  gql
} from "@apollo/client";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

function CartView(){
  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);

  const LOAD_USER_CART = gql`
    query cartItems(
        $user: String!
        ){
          cartItems(
            user: $user
        ) {
          name
          discountPrice
          img
          isNew
          isHot
          isFreeShipping
          originPrice
          price
          star
          description
        }
    }
    `

  const {data, loading, error} = useQuery(LOAD_USER_CART, {variables:{user: user}})
  var cartTotal = 0;
  if(data!=undefined){
    cartTotal = data['cartItems'].reduce((total, { price = 0 }) => total + price, 0);
    console.log(cartTotal)  
  }
  
 


  const renderItems = (item, index) => {
    return (
      <tr>
        <td>
                        <div className="row">
                          <div className="col-3 d-none d-md-block">
                            <img
                              src={item.img}
                              width="80"
                              alt="..."
                            />
                          </div>
                          <div className="col">
                            <Link
                              to="/product/detail"
                              className="text-decoration-none"
                            >
                              
                               {item.name}
                            </Link>
                          
                          </div>
                        </div>
                      </td>
                      <td>
                         <td>
                        <var className="Quantity"> 1 </var>
                      </td>
                      </td>
                      <td>
                        <var className="price">{item.price} ctx</var>
                      </td>
                      <td className="text-right">
                        <button className="btn btn-sm btn-outline-secondary mr-2">
                          <IconHeartFill className="i-va" />
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <IconTrash className="i-va" />
                        </button>
                      </td><tr />
      </tr>
    );
  }


  console.log(data);
  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-right" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      {(data!=undefined) ? (data['cartItems'].map(renderItems)): " "}
                    
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to={`/checkout/${user}?${cartTotal}`} className="btn btn-primary float-right">
                  Make Purchase <IconChevronRight className="i-va" />
                </Link>
                <Link to="/category" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va mr-2" /> Free Delivery within 1-2
                weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CartView;
