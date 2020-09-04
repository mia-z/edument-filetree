import React, {useEffect, useState} from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import directoryStrings from "./strings";
import { DirectoryBuilder as builder } from "./DirectoryBuilder";
import DirectoryView from "./Components/DirectoryView";
import FilePath from "./Components/FilePath";

function App() {
    const history = useHistory();
    const [paths, setPaths] = useState([...directoryStrings]);
    const [currentFolder, setCurrentFolder] = useState("root");
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [depth, setDepth] = useState(0);

    useEffect(() => {
        let dir = builder(paths, currentFolder, depth);
        setFolders(dir.folders);
        setFiles(dir.files);
    }, [currentFolder, depth, paths]);

    return (
        <Router>
            <Container>
                <FilePath />
                <br />
                <DirectoryView files={files} folders={folders} depth={depth} setDepth={setDepth} setCurrentFolder={setCurrentFolder}/>
            </Container>
        </Router>
    );
}

export default App;
