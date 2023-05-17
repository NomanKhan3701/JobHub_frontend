import * as actionTypes from "../constants/jobs";

export const setFilter = (data) => {
    return {
        type: actionTypes.SET_FILTER,
        data: data,
    };
}

export const setJobs = (data) => {
    return {
        type: actionTypes.SET_JOBS,
        data: data,
    };
}