import styles from "./Pagination.module.scss";
import { GrNext, GrPrevious } from "react-icons/gr";

type Props = {
  currentPage: number;
  setCurrentPage: (number: number) => void;
};

function Pagination({ setCurrentPage, currentPage }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(100 / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        <GrPrevious className={styles.icon} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`${styles.button} ${
            number === currentPage ? styles.active : ""
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className={styles.button}
      >
        <GrNext className={styles.icon} />
      </button>
    </div>
  );
}

export default Pagination;
