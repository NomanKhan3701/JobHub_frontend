import React from 'react'
import styles from './CardLoader.module.scss';

const CardLoader = () => {
    const job = null;
    return (
        <div className={styles.Card_loader}>
            <div className={styles.job_header}>
                <div className={styles.header_left}>
                    {/* <img src={companyLogo?.src} alt='company-logo' /> */}
                    <div className={styles.image}></div>
                    <div className={styles.job_title}>
                        <div className={styles.title}>
                            {job?.title}
                        </div>
                        <div className={styles.company_name}></div>
                    </div>
                </div>
                <div className={styles.right_tags}>
                    <div className={styles.opportunity}></div>
                    <div className={styles.workplace}></div>
                </div>

            </div>
            <div className={styles.job_body}>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
            </div>
        </div>
    )
}

export default CardLoader