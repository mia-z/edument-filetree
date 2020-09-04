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
    const [previousFolder, setPreviousFolder] = useState("");
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [depth, setDepth] = useState(0);

    useEffect(() => {
        let dir = builder(paths, currentFolder, depth);
        setFolders(dir.folders);
        setFiles(dir.files);
    }, [currentFolder, depth, paths]);

    const handleBack = () => {
        setCurrentFolder(previousFolder);
        setDepth(depth < 1 ? 0 : depth - 1);
    }

    return (
        <Router>
            <Container>
                <Button onClick={() => handleBack()} variant={"primary"}>Back</Button>
                <FilePath />
                <br />
                <DirectoryView
                    files={files}
                    folders={folders}
                    depth={depth}
                    setDepth={setDepth}
                    currentFolder={currentFolder}
                    setCurrentFolder={setCurrentFolder}
                    setPreviousFolder={setPreviousFolder}/>
            </Container>
        </Router>
    );
}

export default App;
