import React from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container-fluid">
          <Link className="navbar-brand" to={{
        pathname: `/home`,
        state: { authenticated: true }
      }}>
            AirBlue
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                                <Link to={{
        pathname: `/category`,
        state: { authenticated: true }
      }} className="nav-link">
                  Fashion
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default TopMenu;
