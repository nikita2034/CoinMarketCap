import React from "react";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import Header from "../../components/Header/Header";
import styles from "./CurrencyPage.module.scss";
function CurrencyPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <CryptoTable />
      </div>
    </>
  );
}

export default CurrencyPage;
