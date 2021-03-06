import React from 'react';
import {connect} from 'react-redux';
import TownModal from "../Modals/townModal";

const Modal = ({modal, closeModal}) => {
    if(!modal) {
        return null;
    }

    return (
        <div className="modal">
            {modal.type === "MODAL_PROFILE" && <TownModal data={modal.data} />}
            <button onClick={closeModal}>Close</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: (id) => dispatch(closeModal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);