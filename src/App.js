import React, { useReducer } from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import DirectoryView from "./Components/DirectoryView";
import FilePath from "./Components/SubComponents/FilePath";
import { DirectoryReducer, initialState } from "./Reducers/DirectoryReducer";
import BoxView from "./Components/BoxView";
import MenuBar from "./Components/MenuBar";

function App() {
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);

    return (
        <Router>
            <Container>
                <BoxView>
                    <MenuBar DirectoryState={state} dispatch={dispatch} />
                    <FilePath DirectoryState={state} dispatch={dispatch} />
                    <DirectoryView DirectoryState={state} dispatch={dispatch} />
                </BoxView>
            </Container>
        </Router>
    );
}

export default App;
