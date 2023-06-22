import React, { useEffect, useState } from "react";
import style from "./create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllTemperament, postDog } from "../../Redux/actions";
import validate from "../../Components/Validate/Validate";

function Create() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperament);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
  name: "",
  height_min: 0,
  height_max: 0,
  weight_min: 0,
  weight_max: 0,
  life_span: 0,
  image: "",
  temperament: [], 
  });


  useEffect(() => {
    dispatch(getAllTemperament());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    const selectedOption = e.target.value;
    if (!input.temperament.includes(selectedOption)) {
      setInput({
        ...input,
        temperament: [...input.temperament, selectedOption],
      });
    }
  }
  

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter(temp => temp !== el)
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    const isFormEmpty = Object.values(input).some(value => value === "");
  
    if (!isFormEmpty && Object.keys(errors).length === 0) {
      dispatch(postDog(input));
      alert("Dog Created");
      setInput({
        name: "",
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: 0,
        image: "",
        temperament: [], 
      });
      history.push("/landing");
    } else {
      alert("Please fill in all the fields correctly.");
    }
  }
  

  return (
    <div>
      <Link to="/home">
        <button className={style.buttoncreate}>Home</button>
      </Link>
      <h1>Create your dog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>Name:</label>
          <input className={style.inputcreate}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={style.error}>{errors.name} </p>}
        </div>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>height_min:</label>
          <input className={style.inputcreate}
            type="number"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_min && <p className={style.error}>{errors.height_min} </p>}
        </div>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>height_max:</label>
          <input className={style.inputcreate}
            type="number"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_max && <p className={style.error}>{errors.height_max} </p>}
        </div>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>weight_min:</label>
          <input className={style.inputcreate}
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_min && <p className={style.error}>{errors.weight_min} </p>}
        </div>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>weight_max:</label>
          <input className={style.inputcreate}
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_max && <p className={style.error}>{errors.weight_max} </p>}
        </div>
        <div className={style.inputcont}>
          <label className={style.labelcreate}>life_span:</label>
          <input className={style.inputcreate}
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span && <p className={style.error}>{errors.life_span} </p>}
        </div >
        <div className={style.inputcont}>
          <label className={style.labelcreate}>Image:</label>
          <input className={style.inputcreate}
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p className={style.error}>{errors.image} </p>}
        </div>
        <div >
        <label className={style.labelcreate}>Temperaments:</label>
        <select className={style.selcreate} onChange={handleSelect}>
        {temperament.map((temp) => (
  <option key={temp.name} value={temp.name}>{temp.name}</option>
))}
        </select>
</div>
        <br />
          {Object.keys(errors).length === 0 ? (
          <button type="submit">Create Dog</button>
        ) : null}
      </form>
      {input.temperament.map((el, index) => (
  <div key={index}>
    <p>{el}</p>
    <button onClick={() => handleDelete(el)}>x</button>
  </div>
))}
    </div>
  );
}

export default Create;
