import React, {useState} from 'react';
import Button from "react-bootstrap";
import Modal from "react-bootstrap";

function ConfirmModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //TODO agregar en el store para mostrar el modal
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {props.confirmationTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to {props.text}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;