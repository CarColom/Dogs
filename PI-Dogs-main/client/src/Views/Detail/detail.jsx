import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDogs } from "../../Redux/actions";
import { Link, useParams } from "react-router-dom";
import style from "./detail.module.css";

const DetailDogs = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailsDogs = useSelector((state) => state.detail_dogs);
  //validar el temperament de cada dogs
  var name = [];
  detailsDogs.temperaments?.forEach((t) => {
    if (t.name) {
      name.push(t.name);
    } else {
      name.push(t);
    }
  });

  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    dispatch(getDetailDogs(id));
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 1000);
  }, [dispatch]);

  return (
    <div className={style.containerdetail}>
      <div>
        <Link to="/Home">
          <button className={style.buttondetail}>Volver</button>
        </Link>
      </div>
      <div>
        {state.loading ? (
          <div className={style.loadingdetail}>
            <p>Cargando data...</p>
          </div>
        ) : (
          <div>
            <div>
              <h2>{detailsDogs.name}</h2>
              <div>
                <img src={detailsDogs.image} alt="NOT FOUND" />
              </div>
            </div>
            <div className={style.detail}>
              <p>{name?.join(", ")}</p>
              <div>
                <p>Height min: {detailsDogs.height?.[0]}Cm</p>
                <p>
                  {detailsDogs.height?.[1]
                    ? "Height max: " + detailsDogs.height[1] + "Cm"
                    : ""}
                </p>
              </div>
              <div>
                <p>Weight min: {detailsDogs.weight?.[0]}Kg</p>
                <p>
                  {detailsDogs.weight?.[1]
                    ? "Weight max: " + detailsDogs.weight[1] + "Kg"
                    : ""}
                </p>
              </div>
              <p>Life Span: {detailsDogs.life_span}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailDogs;
