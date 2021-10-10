import React from "react"
import "./Coupon.css";
import {
    useQuery,
    gql,
    useMutation
  } from "@apollo/client";

const CouponList = (props) => {
    var path = window.location.pathname
    var n = path.lastIndexOf("/");
    var user = path.substring(n+1);
    const LOAD_USER_COUPONS = gql`
    query allMiles(
        $user: String!
        ){
        allCoupons(
            user: $user
        ) {
            code
            value
        }
    }
    `

    const REDEEM_COUPON = gql`
    mutation redeemMiles(
        $user: String!
        ){
        redeemMiles(
            input:{user: $user} 
        ) {
            redeemItem{
              code
            }
          }
    }`

    const { data, loading, error } = useQuery(LOAD_USER_COUPONS , {
        variables: {user: user}
      });

      const [redeemUser, { reddata, redloading,rederror }] = useMutation(REDEEM_COUPON);
      const SubmitHandler = (e)=> {e.preventDefault(); redeemUser({
        variables: {
          user: user,
        },
      });
      window.location.reload();
    }
      if(data!=undefined){
          console.log(data.allCoupons);
      }
      

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
                <div class="pt-5 coupon"> <i>coupon valid for One Month</i> </div>{
                   (data!=undefined && data.allCoupons.length) ? 
                <div class="btns rounded mt-3" onClick={SubmitHandler}>REDEEM NOW</div>
                :
                <div class="btns rounded mt-3">ALREADY USED</div> 
                }
            
            </div>
        </div>
    </div>
</div>
    </React.Fragment>
}

export default CouponList;