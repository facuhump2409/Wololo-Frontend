import AutoComplete from "rsuite";
import React, {Component} from "react";

const data = ['@gmail.com', '@yahoo.com', '@hotmail.com','@gmail.com.ar', '@yahoo.com.ar', '@hotmail.com.ar']

class CustomAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        const at = value.match(/@[\S]*/);
        const nextData = at
            ? data.filter(item => item.indexOf(at[0]) >= 0).map(item => {
                return `${value}${item.replace(at[0], '')}`;
            })
            : data.map(item => `${value}${item}`);

        this.setState({
            data: nextData
        });
    }

    render() {
        return (
            <div>
                <AutoComplete data={this.state.data} placeholder="Email" onChange={this.handleChange}/>
            </div>
            );
    }
}
export default CustomAutoComplete;