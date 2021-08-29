import React, { lazy, Component, useState } from "react";
import { data } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  useQuery,
  gql
} from "@apollo/client";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

const ProductListView = props => {
  const [currentProducts, setProducts] = useState([]);
  const LOAD_ITEMS = gql`
    query allItems{
      allItems{
        description
        discountPrice
        img
        isFreeShipping
        isHot
        isNew
        name
        price
        originPrice
        star
      }
    }
  `
  const [profileState, setProfileState] = useState(props);
  console.log(profileState.location.state.authenticated)
  const { data, loading, error } = useQuery(LOAD_ITEMS);
  console.log(data);

  return(
    <div>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              Fashion
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <span className="align-middle font-weight-bold">
                    {(data!=undefined)? data.allItems.length : "0"} results for{" "}
                    <span className="text-warning">"fashion"</span>
                  </span>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select mw-180 float-left"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select>
                  <div className="btn-group ml-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className="btn"
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className="list"
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {(data!=undefined) ? (
                  data['allItems'].map((item, index) => {
                    return (
                      <div key={index} className="col-md-12">
                        <CardProductList data={item} />
                      </div>
                    );
                  })
                ): ""}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
  );

}
export default ProductListView;
