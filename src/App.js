import React, { useReducer } from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router } from "react-router-dom";
import { Container, Button, Jumbotron } from "react-bootstrap";
import DirectoryView from "./Components/DirectoryView";
import FilePath from "./Components/SubComponents/FilePath";
import { DirectoryReducer, initialState } from "./Reducers/DirectoryReducer";

function App() {
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);
    const handleBack = () => {
        if (state.depth > 0)
            dispatch({type: "DIRECTORY_UP"});
    }
    const handleCreateDirectory = () => dispatch({type: "DIRECTORY_CREATE", payload: "newfolder" + state.depth});
    const handleCreateFile = () => dispatch({type: "FILE_CREATE", payload: "newfile.jpg"});

    return (
        <Router>
            <Container className={"mt-2"}>
                <Jumbotron>
                    <Button id="back-button" onClick={() => handleBack()} variant={"primary"}>Back</Button>
                    <Button id="new-dir-button" onClick={() => handleCreateDirectory()} variant={"primary"}>New Folder</Button>
                    <Button id="new-file-button" onClick={() => handleCreateFile()} variant={"primary"}>New File</Button>
                    <br />
                    <FilePath path={state.currentPath}/>
                    <br />
                    <DirectoryView DirectoryState={{state: state, dispatch: dispatch}}/>
                </Jumbotron>
            </Container>
        </Router>
    );
}

export default App;
