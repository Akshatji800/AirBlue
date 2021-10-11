import React, { Component } from "react";
import { Link } from "react-router-dom";
import CouponList from "./CouponList";

class CouponsView extends Component {
  componentDidMount(props){
    if(this.props.location.state == undefined){
     console.log(this.props.location.state.authenticated) 
    }
  }
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
