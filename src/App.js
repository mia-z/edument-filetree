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

    const handleCreateDirectory = () => dispatch({type: "OBJECT_CREATE", payload: { type: "DIRECTORY", name: "newfolder" + state.depth } });
    const handleCreateFile = () => dispatch({type: "OBJECT_CREATE", payload: { type: "FILE", name: "newfile.jpg" } });

    return (
        <Router>
            <Container className={"mt-2"}>
                <Jumbotron>
                    <FilePath DirectoryState={state} dispatch={dispatch}/>
                    <DirectoryView DirectoryState={{state: state, dispatch: dispatch}}/>
                </Jumbotron>
            </Container>
            <Button id="new-dir-button" onClick={() => handleCreateDirectory()} variant={"primary"}>New Folder</Button>
            <Button id="new-file-button" onClick={() => handleCreateFile()} variant={"primary"}>New File</Button>
        </Router>
    );
}

export default App;
