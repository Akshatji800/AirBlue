import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  useQuery,
  gql
} from "@apollo/client";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconCoupons } from "bootstrap-icons/icons/credit-card-fill.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);
  const LOAD_USER_MILES = gql`
    query allMiles(
        $user: String!
        ){
        allMiles(
            user: $user
        ) {
            miles
        }
    }
    `

  const { data, loading, error } = useQuery(LOAD_USER_MILES, {
    variables: {user: user}
  });


  return (
    <React.Fragment>
      <header className="p-3 border-bottom bg-light" >
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link className="navbar-brand" to={{
        pathname: `/home/${user}`,
        state: { authenticated: true }
      }}>
                <img
                  alt="logo"
                  src="../../images/AirBlue.png"
                />
              </Link>
            </div>
            <div className="col-md-5">
              <Search />
            </div>
            <div className="col-md-4">
              <div className="position-relative d-inline mr-3">
                <Link to={{
        pathname: `/cart/${user}`,
        state: { authenticated: true }
      }} className="btn btn-primary">
                  <IconCart3 className="i-va" />
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border mr-3 dropdown-toggle1"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={{pathname: `/redeem/coupons/${user}`, state: { authenticated: true } }}>
                      <IconCoupons className="text-warning" /> Redeem Coupon
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/orders">
                      <IconListCheck className="text-primary" /> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/wishlist">
                      <IconHeartFill className="text-danger" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/star/zone">
                      <IconStarFill className="text-warning" /> Star Zone
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/notification">
                      <IconBellFill className="text-primary" /> Notification
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/support">
                      <IconInfoCircleFill className="text-success" /> Support
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <IconDoorClosedFill className="text-danger" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
              <a>
                AirMiles: {(data!=undefined)? data.allMiles[0].miles : "0"} ams
              </a>
              {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Header;
