import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Coupon.css";

class CouponsView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
          <div class="containers">
    <div class="row">
         <div class="col-md-6" id="image"> <img src="https://www.freepnglogos.com/uploads/plane-png/png-jet-plane-transparent-jet-plane-images-pluspng-34.png" alt="" id="plane"/> </div>
        <div class="col-md-6">
            <div id="info" class="pt-md-4">
                <div id="mobile-plane"> <img src="https://www.freepnglogos.com/uploads/plane-png/png-jet-plane-transparent-jet-plane-images-pluspng-34.png" alt=""/> </div>
                <div class="h4">Get</div>
                <div class="offer font-weight-bold"><i>1000 AirMiles</i></div>
                <div class="h4">on</div>
                <div class="h4">Redeem</div>
                <div class="pt-5 coupon"> <i>coupon valid for One Month</i> </div>
                <div class="btns rounded mt-3">REDEEM NOW</div>
            </div>
        </div>
    </div>
</div>
      </React.Fragment>
    );
  }
}

export default CouponsView;
