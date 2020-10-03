import React from 'react';
import RadioGroup, { Modal } from 'rsuite';
import Radio from "rsuite";
import ButtonToolbar from "rsuite";
import { Button } from 'rsuite';
import {connect} from "react-redux";

class TownModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }
    render() {
        const { backdrop, show } = this.state;
        return (
            <div className="modal-container">
                <ButtonToolbar>
                    <Button onClick={this.open}> Open</Button>
                </ButtonToolbar>

                <Modal backdrop={backdrop} show={show} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Town States for {this.props.town}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>

                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default TownModal;