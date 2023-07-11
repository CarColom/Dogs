import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getAllDogsByTemperament,
  getAllDogsexistandCreated,
  getAllTemperament,
  getOrderByDogs,
  getOrderByPesoDogs,
} from "../../Redux/actions";
import Card from "../../Components/Card/Card";
import Pagination  from "../../Components/Pagination/Pagination";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperament = useSelector((state) => state.temperament);

  const [state, setState] = useState({
    value: "",
    dogs: "",
    orderDogs: "",
    orderPeso: "",
    currentPage: 1,
    nroPaginado: 8,
  });

  const ultimoPage = state.nroPaginado * state.currentPage;
  const primerPage = ultimoPage - state.nroPaginado;
  const mainDogs = dogs?.slice(primerPage, ultimoPage);

  function onClickPagination(numero) {
    setState((prevState) => ({ ...prevState, currentPage: numero }));
  }

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
  }, [dispatch]);

  const handleChangeTemperament = (ev) => {
    ev.preventDefault();
    dispatch(getAllDogsByTemperament(ev.target.value));

    setState((prevState) => ({
      ...prevState,
      dogs: "All",
      currentPage: 1,
      value: "",
    }));
  };

  const onChangeDogs = (ev) => {
    ev.preventDefault();
    dispatch(getAllDogsexistandCreated(ev.target.value));
    setState((prevState) => ({
      ...prevState,
      dogs: ev.target.value,
      currentPage: 1,
      value: "",
    }));
  };

  const onChangeOrderDogs = (ev) => {
    ev.preventDefault();
    dispatch(getOrderByDogs(ev.target.value));
    setState((prevState) => ({
      ...prevState,
      orderDogs: ev.target.value,
      currentPage: 1,
      value: "",
    }));
  };

  const onChangeOrderPesoDogs = (ev) => {
    dispatch(getOrderByPesoDogs(ev.target.value));
    setState((prevState) => ({
      ...prevState,
      orderPeso: ev.target.value,
      currentPage: 1,
      value: "",
    }));
  };

  return (
    <body>
      <div className={style.container}>
        <Navbar />

        <div className={style.filters}>
          <div>
            <span>Filter by Temperament</span>
            <select onChange={(ev) => handleChangeTemperament(ev)}>
              <option value="AllTemperament">All</option>
              {temperament?.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>Filter by existing or created dog breed</span>
            <select onChange={(ev) => onChangeDogs(ev)} value={state.dogs}>
              <option value="All">All</option>
              <option value="created">created</option>
              <option value="existing">existing</option>
            </select>
          </div>
          <div>
            <span>Order by Dogs</span>
            <select onChange={(ev) => onChangeOrderDogs(ev)}>
              <option value="OrderBy">Order By Dogs</option>
              <option value="ascDogs">[A-Z]</option>
              <option value="descDogs">[Z-A]</option>
            </select>
          </div>
          <div>
            <span>Order by Weight</span>
            <select onChange={(ev) => onChangeOrderPesoDogs(ev)}>
              <option value="OrderByPeso">Order By Peso</option>
              <option value="ascPeso">asc</option>
              <option value="descPeso">desc</option>
            </select>
          </div>
        </div>

        <div className={style.card}>
          {mainDogs.map((props) => (
            <Link to={`/detail/${props.id}`} key={props.id}>
              <Card
                nombre={props.name}
                imagen={props.image}
                temperament={props.temperaments?.map((temp) => (
                  <span key={temp.name ? temp.name : temp}>
                    {temp.name ? temp.name : temp}
                  </span>
                ))}
                weight_min={props.weight && props.weight[0] ? (props.weight[1] ?? props.weight[0]) : ""}
                weight_max={props.weight && props.weight[1] ? props.weight[1] : ""}
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Pagination
          totalPagination={dogs?.length}
          nroPaginado={state.nroPaginado}
          onClickPagination={onClickPagination}
        />
      </div>
    </body>
  );
};

export default Home;





