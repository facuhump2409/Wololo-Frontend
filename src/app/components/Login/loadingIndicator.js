import React, {Component} from 'react'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

export const LoadingIndicator = (display) => {
    // const { promiseInProgress } = usePromiseTracker();
        return (
            display.display &&
            <div className="loading-element">
                <Loader type="ThreeDots" color="#0000FF" height="100" width="100" />
            </div>
        );

}
