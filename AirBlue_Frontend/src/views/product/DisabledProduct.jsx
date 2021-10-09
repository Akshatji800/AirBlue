import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  useMutation,
  gql
} from "@apollo/client";
const CardProductListDisabled = (props) => {
  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);
  const ADD_CART = gql`
    mutation addCart(
        $name: String!
        $user: String!
        ){
          addCart(
            input: {
              name: $name
            user: $user
            }
        ) {
          cart {
          name
        }
        }
    }
    `
    const [addCart, { data, loading, error }] = useMutation(ADD_CART);

    const add = () => {
      addCart({variables: {
        name: product.name,
        user: user
      }})
      window.location.reload(false);
    }
  const product = props.data;
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.img} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
              <Link to={product.link} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success mr-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger mr-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star)
                    return (
                      <IconStarFill className="text-warning mr-1" key={key} />
                    );
                  else
                    return (
                      <IconStarFill className="text-secondary mr-1" key={key} />
                    );
                })}
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{product.description}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
          <div className="mb-2">
            <span className="font-weight-bold h5">{product.price}ams</span>
            {product.originPrice > 0 && (
              <del className="small text-muted ml-2">
                {product.originPrice}ams
              </del>
            )}
            {(product.discountPercentage > 0 || product.discountPrice > 0) && (
              <span className={`rounded p-1 bg-warning ml-2 small`}>
                -
                {product.discountPercentage > 0
                  ? product.discountPercentage + "%"
                  : product.discountPrice}ams
              </span>
            )}
          </div>
          {product.isFreeShipping && (
            <p className="text-success small mb-2">
              <IconTruckFill /> Free shipping
            </p>
          )}

          <div className="btn-group btn-block" role="group">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              title="Add to cart"
            >
              <FontAwesomeIcon icon={faCartPlus} style ={{color: "#880808"}} />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              title="Add to wishlist"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductListDisabled;
