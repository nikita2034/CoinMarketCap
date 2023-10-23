import styles from "./NotFound.module.scss";
function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}> 404 - Page not found</p>
    </div>
  );
}
export default NotFoundBlock;
