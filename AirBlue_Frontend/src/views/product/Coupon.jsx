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
        <CouponList value={500} id={1}/>
        <CouponList value={1000} id={2}/>
        <CouponList value={200} id={3}/>
        <CouponList value={600} id={4}/>
      </React.Fragment>
    );
  }
}

export default CouponsView;
