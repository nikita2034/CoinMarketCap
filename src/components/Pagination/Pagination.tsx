// import styles from './Pagination.module.scss'
// import { GrNext, GrPrevious } from "react-icons/gr";
// function Pagination({currentPage,setCurrentPage}) {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(100 / itemsPerPage); i++) {
//         pageNumbers.push(i);
//       }
    
//     return(
//         <div className={styles.pagination}>
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={styles.button}
//         >
//           <GrPrevious />
//         </button>

//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => setCurrentPage(number)}
//             className={styles.button}
//           >
//             {number}
//           </button>
//         ))}
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === pageNumbers.length}
//           className={styles.button}
//         >
//           <GrNext />
//         </button>
//       </div>
//     )
// }

// export default Pagination;
