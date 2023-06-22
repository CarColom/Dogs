import React from "react";
import { useHistory } from "react-router-dom";
import style from "./landing.module.css";
import landing from "../../Img/landing.mp4";

const LadingPage = () => {
  const history = useHistory();

  const handleClickIngresar = (event) => {
    event.preventDefault();
    history.push("/home");
  };

  return (
    <div className={style.landingg}>
      <div className={style.containervideo}>
        <video className={style.video} autoPlay loop muted>
          <source src={landing} type="video/mp4" />
        </video>
        <div className={style.buttonlanding}>
          <button onClick={(event) => handleClickIngresar(event)}>
            Get Into
          </button>
        </div>
      </div>
    </div>
  );
};

export default LadingPage;
