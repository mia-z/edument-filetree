import React from 'react';
import File from "./SubComponents/File";
import Folder from "./SubComponents/Folder";
import "../scss/DirectoryView.scss"

export const DirectoryView = ({DirectoryState}) => {
    const handleFolderClick = (name) => {
        DirectoryState.dispatch({type: "DIRECTORY_DOWN", payload: name});
    }

    return(
        <div className={"directory-container"}>
            {DirectoryState.state.files.length > 0 &&
                DirectoryState.state.files.map((file, index) => (
                    <File key={file.Name+index} file={file} DispatchContext={DirectoryState.dispatch}/>
                ))
            }
            {DirectoryState.state.folders.length > 0 &&
                DirectoryState.state.folders.map((folder, index) => (
                    <Folder key={folder.Name+index} folder={folder} handleFolderClick={handleFolderClick} DispatchContext={DirectoryState.dispatch}/>
                ))
            }
        </div>
    );
}

export default DirectoryView;
