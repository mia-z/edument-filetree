import React from 'react';
import File from "./SubComponents/File";
import Folder from "./SubComponents/Folder";
import "../scss/DirectoryView.scss"

export const DirectoryView = ({DirectoryState, dispatch}) => {
    const handleFolderClick = (name) => {
        dispatch({type: "DIRECTORY_DOWN", payload: name});
    }

    return(
        <div className={"directory-container"}>
            {DirectoryState.files.length > 0 &&
                DirectoryState.files.map((file, index) => (
                    <File key={file.Name+index} file={file} DispatchContext={dispatch}/>
                ))
            }
            {DirectoryState.folders.length > 0 &&
                DirectoryState.folders.map((folder, index) => (
                    <Folder key={folder.Name+index} folder={folder} handleFolderClick={handleFolderClick} DispatchContext={dispatch}/>
                ))
            }
        </div>
    );
}

export default DirectoryView;
