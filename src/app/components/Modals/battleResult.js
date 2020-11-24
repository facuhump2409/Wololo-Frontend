import React from "react";
import { Modal } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "./style.css";
import Emoji from "../emoji";
import {connect} from "react-redux";

const mapStateToProps = state => ({ ...state.games });

class BattleResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true
        };
    }
    render() {
        const { backdrop } = this.state;
        const towns = this.props.selectedTowns;
        const deltaAction = this.props.deltaAction
        const [message, emoji] = (deltaAction.deltaTowns[0] && (deltaAction.deltaTowns[1].deltaOwnerUsername || deltaAction.deltaTowns[0].deltaOwnerUsername)) ? ['YOU WON!!!', <Emoji symbol="🦁" />]
            : deltaAction.deltaTowns[0] ? ['YOU CANT ATTACK WITH NO GAUCHOS', <Emoji symbol="😢" />] : ['YOU LOST', <Emoji symbol="😢" />]
        return (
            <div className="modal-container">
                <Modal
                    backdrop={backdrop}
                    show={this.props.display}
                    onHide={this.props.onClose}
                    keyboard={true}
                    onExit={this.props.onClose}
                >
                    <Modal.Header>
                        <Modal.Title align="center">{<Emoji symbol="⚔️" />} Battle's Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 align="center" > {message} {emoji} </h4>
                        <div className="results">
                            <h5 className="thicker">Your army</h5>
                            <p> Location: {deltaAction.deltaTowns[0] ? deltaAction.deltaTowns[0].townName : ""}</p>
                            <p> Gauchos lost in battle: {deltaAction.deltaTowns[0] ? Math.abs(deltaAction.deltaTowns[0].deltaGauchos) : ""}</p>
                            {/*<p> Remaining Gauchos: {towns.town1.gauchos}</p>*/}
                        </div>
                        <div className="results">
                            <h5 className="thicker">Your rival</h5>
                            <p> Location: {deltaAction.deltaTowns[1] ? deltaAction.deltaTowns[1].townName : ""}</p>
                            <p> Gauchos lost in battle: {deltaAction.deltaTowns[1] ? Math.abs(deltaAction.deltaTowns[1].deltaGauchos) : ""}</p>
                            {/*<p> Remaining Gauchos: {towns.town2.gauchos}</p>*/}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>Keep calm and carry on</Modal.Footer> }
                </Modal>
            </div>
        );
    }
}
export default connect(mapStateToProps, null)(BattleResult);
