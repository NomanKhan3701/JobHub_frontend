import React, { useEffect, useRef, useState } from 'react'
import styles from './Jobs.module.scss';
import Image from 'next/image';
import companyLogo from '@/assets/images/companyLogo.jpg';
import companyDefault from '@/assets/images/companyDefault.webp';
import LimitChar from '../UI/LimitChar/LimitChar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import CardLoader from '../UI/Loaders/CardLoader/CardLoader';
import * as actions from '@/store/actions/index';
import noDataGif from '@/assets/images/No_data.gif';

const Jobs = () => {
    const jobs = useSelector(state => state.job.jobs);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [intersected, setIntersected] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const intersectionDiv = useRef(null);

    useEffect(() => {
        getJobs();
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIntersected(true);
                else setIntersected(false);
            },
            []
        );

        if (intersectionDiv.current) {
            observer.observe(intersectionDiv.current);
        }

        return () => {
            if (intersectionDiv.current) observer.unobserve(intersectionDiv.current);
        };
    }, []);

    useEffect(() => {
        if (intersected) {
            getJobs();
        }
    }, [intersected]);

    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e5, symbol: "L" },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    const getJobs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/offer?offset=${offset}&limit=${limit}`);
            console.log(res.data);
            setOffset((prev) => prev + limit);
            const newJobList = [...jobs, ...res.data];
            dispatch(actions.setJobs(newJobList));
            setLoading(false);

        } catch (e) {
            console.log(e);
            toast.error('Something went wrong while fetching jobs!');
        }
    }

    return (
        <div className={styles.Jobs}>
            <div className={styles.jobs_list}>
                {
                    !loading && jobs.length === 0 && <div className={styles.no_data}>
                        <img src={noDataGif.src} alt="" />
                        <div className={styles.title}>No jobs found </div>
                        <div className={styles.subtitle}>
                            Try changing the filters or check back later
                        </div>
                    </div>
                }
                {
                    jobs.map((job, index) => {
                        return (
                            <div className={styles.job} key={index}>
                                <div className={styles.job_header}>
                                    <div className={styles.header_left}>

                                        <img src={companyDefault.src} alt='company-logo' />
                                        <div className={styles.job_title}>
                                            <div className={styles.title}>
                                                {job.title}
                                            </div>
                                            <div className={styles.company_name}>
                                                {job.organization.name} {job.batches && " | " + job.batches.join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.right_tags}>
                                        {
                                            job.opportunityType && <div className={styles.opportunity}>{job.opportunityType}</div>
                                        }
                                        {
                                            job.workplace && <div className={styles.workplace}>{job.workplace}</div>
                                        }
                                    </div>

                                </div>
                                <div className={styles.job_body}>
                                    <div className={styles.salary}>
                                        <div className={styles.salary_heading}>{`${job.opportunityType} (${job.stipend.type})`}</div>
                                        <div className={styles.salary_range}>
                                            {job.stipend.currency}{nFormatter(job.stipend.low)} - {nFormatter(job.stipend.high)}
                                        </div>
                                    </div>
                                    {
                                        job.opportunityType === 'Internship' && <div className={styles.line}></div>
                                    }
                                    {
                                        job.PPO && <div className={styles.salary}>
                                            <div className={styles.salary_heading}>Full Time ({job.PPO.type})</div>
                                            <div className={styles.salary_range}>
                                                {job.stipend.currency}{nFormatter(job.PPO.low)} - {nFormatter(job.PPO.high)}
                                            </div>
                                        </div>
                                    }
                                    <div className={styles.apply}>
                                        <button>Apply</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
                {
                    loading && <>
                        <CardLoader />
                        <CardLoader />
                        <CardLoader />
                        <CardLoader />
                    </>
                }
                {
                    jobs.length !== 0 && <div ref={intersectionDiv} className={styles.scroll_to_me}></div>
                }

            </div>
        </div>
    )
}

export default Jobs