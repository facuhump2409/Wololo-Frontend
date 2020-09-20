import React from 'react';

class ListErrors extends React.Component {
    render() {
        const error = this.props.errors;
        if (error) {
            return(<div className="error-message">{error}</div>);
        } else {
            return null;
        }
    }
}

export default ListErrors;
