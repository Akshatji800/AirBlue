import React from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = () => {
  return (
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
  );
};
export default Search;