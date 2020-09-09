import React, { useEffect, useState } from "react";
import { Modal, Alert, Button, Container, Col, Row, Form } from "react-bootstrap";

export const RenameModal = ({dispatch, objectProps, destroy}) => {
    const [newName, setNewName] = useState("");
    const [renameEnabled, setRenameEnabled] = useState(false);
    const [visible, setVisible] = useState(true);

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
                            <Button block variant={"danger"} onClick={() => setVisible(false)}>Cancel</Button>
                        </Col>
                        <Col md={4}>
                            <Button block variant={"primary"} disabled={renameEnabled ? "" : true} onClick={() => handleRenameConfirm()}>Confirm</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default RenameModal;
