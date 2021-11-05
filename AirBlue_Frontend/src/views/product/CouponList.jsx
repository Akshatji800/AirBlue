import React from "react"
import "./Coupon.css";
import {
    useQuery,
    gql,
    useMutation
  } from "@apollo/client";
  import { getTokens } from "../../tokens";

const CouponList = (props) => {
    var path = window.location.pathname
    var n = path.lastIndexOf("/");
    var user = path.substring(n+1);
    console.log(props);

    const CHANGE_COUPON_STATUS = gql`
    mutation useCoupon(
        $couponCode: String!
        $user: String!
        ){
          useCoupon(
            input:{
              couponCode: $couponCode
              user: $user
            }
        ) {
          couponChange {
            miles
          }
        }
    }
    `

    

      const [changeCoupon, { cdata, cloading,cerror }] = useMutation(CHANGE_COUPON_STATUS);

      const SubmitHandler = (e)=> {e.preventDefault();

      changeCoupon({
        variables: {
          couponCode: props.id,
          user: getTokens()

        },
      });
      window.location.reload();
    }
      
    console.log(props.status);

    return <React.Fragment>
        <div class="containers">
    <div class="row">
         <div class="col-md-6" id="image"> <img src="https://www.freepnglogos.com/uploads/plane-png/png-jet-plane-transparent-jet-plane-images-pluspng-34.png" alt="" id="plane"/> </div>
        <div class="col-md-6">
            <div id="info" class="pt-md-4">
                <div id="mobile-plane"> <img src="https://www.freepnglogos.com/uploads/plane-png/png-jet-plane-transparent-jet-plane-images-pluspng-34.png" alt=""/> </div>
                <div class="h4">Get</div>
                <div class="offer font-weight-bold"><i> {props.value} AirMiles</i></div>
                <div class="h4">on</div>
                <div class="h4">Redeem</div>
                <div class="pt-5 coupon"> <i>coupon valid for One Month</i> </div>
                {
                   (props.status) ? 
                   <div class="btns rounded mt-3">ALREADY USED</div> 
                :
                <div class="btns rounded mt-3" onClick={SubmitHandler}>REDEEM NOW</div>
                }
            
            </div>
        </div>
    </div>
</div>
    </React.Fragment>
}

export default CouponList;