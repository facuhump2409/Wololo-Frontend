import React from 'react';
import { Modal } from 'rsuite';
import { Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {connect, useDispatch, useSelector} from "react-redux";
import {CardBody} from "reactstrap";
import SearchInput from "./searchInput";

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            search: false
        };
        this.onSearch = this.onSearch.bind(this)
    }
    onSearch(){
        this.setState({
            search: true
        })
        this.props.onClose()
    }
    render() {
        const { backdrop } = this.state;
        return (
            <div className="modal-container">

                <Modal backdrop={backdrop} show={this.props.display} onHide={this.onSearch}>
                    <Modal.Header>
                        <Modal.Title>Select a user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchInput users={this.props.users} search={this.state.search}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onSearch} appearance="primary">
                            Search
                        </Button>
                        {/*<Button onClick={this.props.close} appearance="subtle">*/}
                        {/*    Cancel*/}
                        {/*</Button>*/}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UserModal;