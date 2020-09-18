import React, {Component} from 'react'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

export const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div className="loading-element">
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
);
}
