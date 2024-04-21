import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Loader;
