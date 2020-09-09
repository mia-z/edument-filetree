import React, { useState } from "react";
import { Modal, Alert, Button, Container, Col, Row } from "react-bootstrap";

export const DeleteModal = ({dispatch, objectProps, destroy}) => {
    const [visible, setVisible] = useState(true);

    const handleDeleteConfirm = () => {
        dispatch({type: "OBJECT_DELETE", payload: {...objectProps }});
        setVisible(false);
    }

    return(
        <Modal
            show={visible}
            size="lg"
            centered
            backdrop={"static"}
            onExited={() => destroy()}
        >
            <Modal.Header>
                <Container>
                    <Row className={"justify-content-center"}>
                        <Col md={6}>
                            <h4 className={"text-center text-capitalize"}>Delete {objectProps.Type.toLowerCase()}</h4>
                        </Col>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {objectProps.Type === "DIRECTORY" &&
                    <Alert variant={"danger"} className={"text-center"}>
                        <span className={"text-danger"}><b>WARNING</b></span>
                        <br/>
                        Deleting a folder will delete all of it's contents
                    </Alert>
                    }
                    <Row>
                        <Col md={12}>
                            <Alert variant={"primary"}>
                                <p className={"text-center my-auto"}><b>Name: </b>{objectProps.Name}</p>
                                <p className={"text-center my-auto"}><b>In Folder: </b>{objectProps.BelongsTo}</p>
                            </Alert>
                        </Col>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col md={4}>
                            <Button block variant={"danger"} onClick={() => setVisible(false)}>Cancel</Button>
                        </Col>
                        <Col md={4}>
                            <Button block variant={"primary"} onClick={() => handleDeleteConfirm()}>Confirm</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );


}

export default DeleteModal;
