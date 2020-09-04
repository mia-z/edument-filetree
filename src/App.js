import React, { useReducer } from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import DirectoryView from "./Components/DirectoryView";
import FilePath from "./Components/FilePath";
import { DirectoryReducer, initialState } from "./Reducers/DirectoryReducer";

function App() {
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);
    const handleBack = () => {
        dispatch({type:"DIRECTORY_UP"});
    }

    return (
        <Router>
            <Container>
                <Button onClick={() => handleBack()} variant={"primary"}>Back</Button>
                <FilePath path={state.currentPath}/>
                <br />
                <DirectoryView DirectoryState={{state: state, dispatch: dispatch}}/>
            </Container>
        </Router>
    );
}

export default App;
