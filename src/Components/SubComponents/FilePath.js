import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import "../../scss/FilePath.scss";

export const FilePath = ({DirectoryState, dispatch}) => {
    const [backDisabled, setBackDisabled] = useState(false);
    useEffect(() => {
        if (DirectoryState.depth < 1)
            setBackDisabled(true);
        else setBackDisabled(false);
    }, [DirectoryState.depth]);

    const handleBack = () => {
        dispatch({type: "DIRECTORY_UP"});
    }

    const handleFolderJump = (folderName, index) => {
        let updatedPath = [];
        let found = false;
        for (let str of DirectoryState.currentPath) {
            if (found) break;
            if (str !== folderName) {
                updatedPath.push(str);
            } else {
                found = true;
                updatedPath.push(str);
            }
        }
        const payload = {
            currentFolder: folderName,
            depth: index,
            currentPath: updatedPath
        }
console.log(payload);
        dispatch({type: "DIRECTORY_JUMP", payload: payload});
    }

    return (
        <Container fluid className={"path-container"}>
            <Row noGutters className={"align-items-center mx-auto"}>
                <Col md={1}>
                    <Button id={"back-button"} disabled={backDisabled ? true : ""} block variant={"secondary"} onClick={() => handleBack()}><i className={"fas fa-level-up-alt"}/></Button>
                </Col>
                <Col md={11}>
                    <div className={"path-text-container"}>
                        {
                            DirectoryState.currentPath.map((str, index) => (
                                <div className={`path-link ${str === DirectoryState.currentFolder ? "active" : ""}`}
                                     key={str+index}
                                     onClick={() => handleFolderJump(str, index)}
                                >/{str}</div>
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default FilePath;
