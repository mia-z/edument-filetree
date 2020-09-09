import React from "react";
import "../scss/MenuBar.scss";
import useModals from "../Hooks/useModals";
import { Container } from "react-bootstrap";

export const MenuBar = ({DirectoryState, dispatch}) => {
    const modal = useModals();

    const handleCreateFile = () => {
        modal.set({
            type: "CREATE_FILE",
            dispatch: dispatch,
            state: DirectoryState
        })
    }

    const handleCreateDirectory = () => {
        modal.set({
            type: "CREATE_FOLDER",
            dispatch: dispatch,
            state: DirectoryState
        });
    }

    return (
        <Container>
            <div className={"menu-bar"}>
                <button onClick={() => handleCreateFile()}>Create new file</button>
                <button onClick={() => handleCreateDirectory()}>Create new folder</button>
            </div>
            {modal.render()}
        </Container>
    );
}

export default MenuBar;
