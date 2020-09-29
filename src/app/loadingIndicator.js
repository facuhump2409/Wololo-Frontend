import React from 'react'
import Loader from 'react-loader-spinner';

export const LoadingIndicator = (props) => {
    // const { promiseInProgress } = usePromiseTracker();
        return (
            props.display &&
            <div style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Loader type="ThreeDots" color="#0000FF" height="100" width="100" />
            </div>
        );
}
