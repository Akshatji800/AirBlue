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
    console.log(props);


    const LOAD_USER_COUPONS = gql`
    query couponInfo(
        $id: Int!
        ){
          couponInfo(
            id: $id
        ) {
            used
        }
    }`

    const CHANGE_COUPON_STATUS = gql`
    mutation useCoupon(
        $id: Int!
        ){
          useCoupon(
            input:{
              id: $id
            }
        ) {
          couponChange {
            miles
          }
        }
    }
    `

    const INCREASE_USER_MILES = gql`
    mutation increseMiles(
        $miles: Int!
        $user: String!
        ){
          increseMiles(
            input: {
              miles: $miles
            user: $user
            }
        ) {
          milesDetails {
          miles
        }
        }
    }`


    const { data, loading, error } = useQuery(LOAD_USER_COUPONS , {
        variables: {id: props.id}
      });
      if(data!=undefined){
        console.log(data.couponInfo[0]['used']);
      }
    

      const [changeCoupon, { cdata, cloading,cerror }] = useMutation(CHANGE_COUPON_STATUS);

      const [increseMiles, { idata, iloading,ierror }] = useMutation(INCREASE_USER_MILES);

      const SubmitHandler = (e)=> {e.preventDefault();

      changeCoupon({
        variables: {
          id: props.id,
        },
      });

      increseMiles({
        variables: {
          miles: props.value,
          user: user,
        },
      });

      
      //window.location.reload();
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
                   (data!=undefined && !data.couponInfo[0]['used']) ? 
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