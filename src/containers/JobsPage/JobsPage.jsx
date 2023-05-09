import React, { useEffect, useRef, useState } from 'react'
import styles from './JobsPage.module.scss'
import Filter from '@/components/Filter/Filter'
import Jobs from '@/components/Jobs/Jobs'
import headerBg from '@/assets/images/bgHeader.png'
import useScrolledDown from '@/hooks/useScrolledDown'
import { AiOutlineControl } from 'react-icons/ai';
import { useScreenMedia } from '@/hooks/useScreenMedia'
import useClickOutside from '@/hooks/useClickedOutside'

const JobsPage = () => {
    const [searchText, setSearchText] = useState('');
    const scrolledDown = useScrolledDown();
    const { screens: screens, width: screenWidth } = useScreenMedia();
    const filterRef = React.useRef(null);
    const filterBtnRef = React.useRef(null);
    const [showFilter, setShowFilter] = useState(false);

    const handleClick = e => {
        if (filterRef.current && !filterRef.current.contains(e.target) && filterBtnRef.current && !filterBtnRef.current.contains(e.target)) {
            setShowFilter(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const search = () => {

    }

    return (
        <div className={styles.Jobs_page + " container"}>
            <div ref={filterBtnRef} className={styles.filter_sm} onClick={() => setShowFilter(true)}>
                <AiOutlineControl />
            </div>

            <div className={styles.result_sm}>
                <div className={styles.util}>
                    123 Results
                </div>
            </div>
            <div className={styles.jobs_container}>
                <div
                    className={
                        styles.filter_wrapper
                        + ` ${!(screenWidth < screens.tabLg) ? "sticky-top" : ""}`
                        + ` ${scrolledDown && !(screenWidth < screens.tabLg) ? styles.scrolled : ""}`

                    }>
                    <div className={styles.filter_container + ` hide_scrollbar ${showFilter ? styles.show_filter : ''}`} ref={filterRef}>
                        <Filter />
                    </div>
                </div>
                <div className={styles.jobs_wrapper}>
                    <Jobs />
                </div>
            </div>

        </div>
    )
}

export default JobsPage