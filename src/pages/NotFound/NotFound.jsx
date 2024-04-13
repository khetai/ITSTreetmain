import React from "react";
import styles from "./index.module.scss";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
