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
        <CouponList value={500}/>
        <CouponList value={1000}/>
        <CouponList value={200}/>
        <CouponList value={600}/>
      </React.Fragment>
    );
  }
}

export default CouponsView;
