import React from "react";
import styles from './NotFound.module.scss'
function NotFoundBlock(){
    return <div className={styles.root}>
        <h1 >
            <br/>
            Ничего не найдено
        </h1>
        <p className={styles.description}> 404 - Страница не найдена</p>
    </div>
}
export default NotFoundBlock