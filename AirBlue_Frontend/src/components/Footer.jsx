import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconBriefcase } from "bootstrap-icons/icons/briefcase.svg";
import { ReactComponent as IconBadgeAd } from "bootstrap-icons/icons/badge-ad.svg";
import { ReactComponent as IconGift } from "bootstrap-icons/icons/gift.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faApple,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="container-fluid bg-primary">
          <div className="row ">
            <div className="col-md-9 py-3 text-white">
              Get connected with us on social networks!
            </div>
            <div className="col-md-3 py-3 text-center text-white">
              <>
                <FontAwesomeIcon icon={faApple} className="text-light mr-3" />
              </>
              <>
                <FontAwesomeIcon icon={faWindows} className="text-light mr-3" />
              </>
              <>
                <FontAwesomeIcon icon={faAndroid} className="text-light mr-3" />
              </>
              |
              <>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-light ml-3 mr-3"
                />
              </>
              <>
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-light mr-3"
                />
              </>
              <>
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-light mr-3"
                />
              </>
              <>
                <FontAwesomeIcon icon={faYoutube} className="text-light mr-3" />
              </>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-dark text-white">
          <div className="row ">
            <div className="col-md-3 py-3">
              <div className="h6">AirBlue</div>
              <hr />
              <p>
                A website to make use of earned miles to shop for daily use products.
              </p>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Products</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Electronics
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Mobiles
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Car & bike
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Super Market
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Travel Cards
                  </>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Policy</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Return Policy
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Terms Of Use
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Security
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    Privacy
                  </>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <>
                    EPR Compliance
                  </>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Address</div>
              <hr />
              <address>
                <strong>AirBlue, Inc.</strong>
                <br />
                1355 Market St, Suite 900
                <br />
                San Francisco, CA 94103
                <br />
                <abbr title="Phone">Phone Number -</abbr> (123) 456-7890
              </address>
              <div className="h6">Customer Care</div>
              <hr />
              <IconTelephone /> +91 98308 14358
              <br />
              <IconEnvelope /> info@email.com
            </div>
          </div>
        </div>
        <div className="container-fluid bg-secondary text-white text-center">
          <div className="row">
            <div className="col-md-2 py-2">
              <>
                <IconBriefcase className="text-warning" /> Partner with us
              </>
            </div>
            <div className="col-md-2 py-2">
              <>
                <IconBadgeAd className="text-info" /> Advertise
              </>
            </div>
            <div className="col-md-2 py-2">
              <>
                <IconGift className="text-dark" /> Gift
              </>
            </div>
            <div className="col-md-3 py-2">
              © 2020-{new Date().getFullYear()} <a href = "https://amfoss.in/" target = "_blank">amFOSS</a>
            </div>
            <div className="col-md-3 py-2 bg-white">
              <img
                src="../../images/payment/american_express.webp"
                width="32"
                alt="American Express"
                className="mr-2"
              />
              <img
                src="../../images/payment/maestro.webp"
                width="32"
                alt="Maestro"
                className="mr-2"
              />
              <img
                src="../../images/payment/netbanking.webp"
                width="32"
                alt="Net Banking"
                className="mr-2"
              />
              <img
                src="../../images/payment/paypal.webp"
                width="32"
                alt="Paypal"
                className="mr-2"
              />
              <img
                src="../../images/payment/rupay.webp"
                width="32"
                alt="Rupay"
                className="mr-2"
              />
              <img
                src="../../images/payment/upi.webp"
                width="32"
                alt="UPI"
                className="mr-2"
              />
              <img
                src="../../images/payment/visa.webp"
                width="32"
                alt="Visa"
                className="mr-2"
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
