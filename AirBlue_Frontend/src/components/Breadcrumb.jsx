import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        <li className="breadcrumb-item">
          <Link to="/home" title="Home">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/category" title="Men">
            Men
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          T-Shirts
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;
