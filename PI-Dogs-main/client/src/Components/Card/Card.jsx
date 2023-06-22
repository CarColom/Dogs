import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <div className={style.front}>
        <h2 className={style.name}>{props.nombre}</h2>
        <div className={style.img}>
          <img src={props.imagen} alt="No se encontró la imagen" />
        </div>
        <div className={style.link}>
          <Link to={`/detail/${props.id}`}>Ver detalles</Link>
        </div>
      </div>

      <div className={style.back}>
        <div className={style.temperament}>
          {props.temperament?.map((temp, index) => (
            <span key={index}>
              {temp.name ? (
                <Link to={`/home/${props.id}`}>{temp.name}</Link>
              ) : (
                <span>{temp}</span>
              )}
            </span>
          ))}
        </div>
        <div className={style.weight}>
          <span>weight min: {props.weight_min}Kg</span>
          <span>weight max: {props.weight_max}Kg</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
