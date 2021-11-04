import React, { Component } from "react";
import { Link } from "react-router-dom";
import CouponList from "./CouponList";
import {
  useQuery,
  gql
} from "@apollo/client";
import { data } from "../../data";

const CouponsView = (props) => {

  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);

  const LOAD_USER_COUPONS = gql`
  query MyQuery (
    $user: String!
    ){
    couponInfo {
      code
      used
    }
    showRedeemStatus(user: $user) {
      redeemed
    }
  }
  `
  
  const { data, loading, error } = useQuery(LOAD_USER_COUPONS, {
    variables: {user: user}
  });
  
    return (
      <React.Fragment>
        {(data!=undefined && data.couponInfo.length != 0)? <CouponList value={1000} id={data.couponInfo[0]['code']} status={data.showRedeemStatus[0].redeemed}/>: <></>}
      </React.Fragment>
    );
}

export default CouponsView;