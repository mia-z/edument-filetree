import React, { useEffect, useState } from "react";
import { Modal, Alert, Button, Container, Col, Row, Form } from "react-bootstrap";

export const CreateObjectModal = ({type, dispatch, state, destroy}) => {
    const [name, setName] = useState("");
    const [exists, setExists] = useState(false);
    const [validated, setValidated] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        switch (type.split("_")[1])  {
            case "FOLDER":
                if (state.folders.some(obj => obj.Name === name))
                    setExists(true);
                else setExists(false);
                if (name.match(/(^[a-zA-Z0-9-_]+$)/g))
                    setValidated(true)
                else setValidated(false);
                break;

            case "FILE":
                if (state.files.some(obj => obj.Name === name))
                    setExists(true);
                else setExists(false);
                if (name.match(/(^[a-zA-Z0-9-_]+[.][a-zA-Z0-9]{1,5}$)/g))
                    setValidated(true)
                else setValidated(false);
                break;

            default: throw new Error("Invalid CreateObjectModal type");
        }
    }, [name, type, state.indexedObjects, state.files, state.folders])

    const handleCreate = () => {
        dispatch({type: "OBJECT_CREATE", payload: { type: type.split("_")[1] === "FOLDER" ? "DIRECTORY" : "FILE", name: name }}); //Very dirty bandaid fix since Ive already sent this off too Björn. im so silly sometimes.
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
                            <h4 className={"text-center text-capitalize"}>Create {type.split("_")[1].toLowerCase()}</h4>
                        </Col>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Alert variant={"primary"}>
                                <p className={"text-center my-auto"}><b>Creating {type.split("_")[1].toLowerCase()} in: </b>{state.currentFolder}</p>
                            </Alert>
                        </Col>
                    </Row>
                    <Row className={"justify-content-center mb-4"}>
                        <Col md={12}>
                            <Form.Control
                                onChange={(event) => setName(event.currentTarget.value) }
                                value={name}
                                placeholder={"Enter new name.."}
                                className={`${validated ? "is-valid" : "is-invalid"} ${exists ? "is-invalid" : "is-valid"}`}
                            />
                            {exists &&
                                <Form.Control.Feedback type={"invalid"}>
                                    Item with that name already exists
                                </Form.Control.Feedback>
                            }

                            <Form.Text muted>
                                {type.split("_")[1] === "FOLDER"
                                    ? "Folder names may only contains letters, numbers, dashes and underscores"
                                    : "Filenames may only contain letters, numbers dashes and underscores, and must have a file extension"
                                }

                            </Form.Text>
                        </Col>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col md={4}>
                            <Button block variant={"danger"} onClick={() => setVisible(false)}>Cancel</Button>
                        </Col>
                        <Col md={4}>
                            <Button block variant={"primary"} disabled={validated && !exists ? "" : true} onClick={() => handleCreate()}>Confirm</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default CreateObjectModal;
