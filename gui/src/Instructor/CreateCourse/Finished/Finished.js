import React from 'react';
import styles from './Finished.module.css';

function Finished(props) {
    return (
        <div className={styles.container}>
            <div className={styles.imgFinished}>
                <img className={styles.imgFinished} src='https://res.cloudinary.com/dlurdcc6c/image/upload/v1654916548/samples/Course/image/done_xidinf.png' alt='Finished'></img>
            </div>

        </div>
    );
}

export default Finished;