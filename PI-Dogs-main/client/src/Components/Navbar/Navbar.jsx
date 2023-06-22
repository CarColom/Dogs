import React, { useState } from "react";
import style from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllDogsByName } from "../../Redux/actions";
import Huella from "../../Img/huella.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(getAllDogsByName(searchValue));
  };

  const handleHomeClick = () => {
    setSearchValue("");
    window.location.reload();
  };

  const handleAddDogClick = () => {
    history.push("/create");
  };

  return (
    <div>
      <h1>Henry Dogs</h1>
      <div className={style.navbar}>
        <ul>
          <li className={style.linknavli}>
            <Link to="#" onClick={handleAddDogClick}>
              Add Dog
            </Link>
          </li>
        </ul>
        <div>
          <input
            className={style.navinput}
            type="text"
            value={searchValue}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
          <button className={style.buttonnav} onClick={handleSearchButtonClick}>
            <img src={Huella} alt="Search" />
            <span>Search</span>
          </button>
        </div>
        <ul>
          <li className={style.linknavli}>
            <Link to="#" onClick={handleHomeClick}>
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
