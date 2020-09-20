import React from 'react';

class ErrorMessage extends React.Component {
    render() {
        const error = this.props.errors;
        if (error) {
            return(<div className="error-message">{error}</div>);
        } else {
            return null;
        }
    }
}

export default ErrorMessage;
