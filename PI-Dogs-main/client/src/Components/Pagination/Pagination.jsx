import style from "./Pagination.module.css";

const Pagination = ({
  totalPagination,
  nroPaginado,
  onClickPagination,
}) => {
  var pagination = [];

  for (let i = 1; i <= Math.ceil(totalPagination / nroPaginado); i++) {
    pagination.push(i);
  }

  return (
    <div className={style.pagination}>
      <ul className={style.ul}>
        {pagination.map((N) => (
          <li className={style.li} key={N}>
            <button
              className={style.buttonpagination}
              onClick={() => onClickPagination(N)}
            >
              {N}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;