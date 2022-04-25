import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMovieByName } from "../../redux/actions";
import s from "./Searchbar.module.css";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleSearch = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getMovieByName(name));
    setName("");
  };

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit}>
        <div className={s.search}>
            <a href="#" className={s.btn}><FaSearch/></a>
          <input  onChange={handleSearch} type="text" name="" placeholder="Search" className={s.text} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
