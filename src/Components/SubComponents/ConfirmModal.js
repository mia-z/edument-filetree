import React, {useEffect, useState} from "react";
import { Modal, Alert, Button, Container, Col, Row, Form } from "react-bootstrap";

export const ConfirmModal = ({visible, type, dispatch, dismissModal, objectProps}) => {
    const [newName, setNewName] = useState("");
    const [renameEnabled, setRenameEnabled] = useState(false);

    useEffect(() => {
        if (objectProps && objectProps.Type === "DIRECTORY") {
            if (newName.match(/(^[a-zA-Z0-9-_]+$)/g))
                setRenameEnabled(true)
            else setRenameEnabled(false);
        }

        if (objectProps && objectProps.Type === "FILE") {
            if (newName.match(/(^[a-zA-Z0-9-_]+[.][a-zA-Z0-9]{1,5}$)/g))
                setRenameEnabled(true)
            else setRenameEnabled(false);
        }
    }, [newName, objectProps])

    const handleRenameConfirm = () => {
        dispatch({type: "OBJECT_RENAME", payload: {...objectProps, newName: newName }});
        dismissModal();
    }

    const handleDeleteConfirm = () => {
        dispatch({type: "OBJECT_DELETE", payload: {...objectProps }});
        dismissModal();
    }

    switch (type) {
        case "rename":
            return(
                <Modal
                    show={visible}
                    size="lg"
                    centered
                    backdrop={"static"}
                >
                    <Modal.Header>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col md={6}>
                                    <h4 className={"text-center text-capitalize"}>Rename {objectProps.Type.toLowerCase()}</h4>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Alert variant={"primary"}>
                                        <p className={"text-center my-auto"}><b>Rename: </b>{objectProps.Name}</p>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row className={"justify-content-center mb-4"}>
                                <Col md={12}>
                                    <Form.Control
                                        onChange={(event) => setNewName(event.currentTarget.value) }
                                        value={newName}
                                        placeholder={"Enter new name.."}
                                        className={renameEnabled ? "is-valid" : "is-invalid"}
                                    />
                                    <Form.Text muted>
                                        {objectProps.Type === "DIRECTORY" ?
                                            "Directory names may only contains letters, numbers, dashes and underscores" :
                                            "Valid filenames may only contain letters, numbers, dashes, underscores and have an extension"
                                        }
                                    </Form.Text>
                                </Col>
                            </Row>
                            <Row className={"justify-content-center"}>
                                <Col md={4}>
                                    <Button block variant={"danger"} onClick={() => dismissModal()}>Cancel</Button>
                                </Col>
                                <Col md={4}>
                                    <Button block variant={"primary"} disabled={renameEnabled ? "" : true} onClick={() => handleRenameConfirm()}>Confirm</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
            );

        case "delete":
            return(
                <Modal
                    show={visible}
                    size="lg"
                    centered
                    backdrop={"static"}
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
                                    <Button block variant={"danger"} onClick={() => dismissModal()}>Cancel</Button>
                                </Col>
                                <Col md={4}>
                                    <Button block variant={"primary"} onClick={() => handleDeleteConfirm()}>Confirm</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
            );

        default: return null;
    }
}

export default ConfirmModal;
