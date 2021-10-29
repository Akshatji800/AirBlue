import React, { Component } from "react";
import { Link } from "react-router-dom";
import CouponList from "./CouponList";

class CouponsView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CouponList value={1000} id={1}/>
      </React.Fragment>
    );
  }
}

export default CouponsView;
