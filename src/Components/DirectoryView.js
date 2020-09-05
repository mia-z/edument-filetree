import React from 'react';
import File from "./File";
import Folder from "./Folder";

export const DirectoryView = ({DirectoryState}) => {
    const handleFolderClick = (name) => {
        DirectoryState.dispatch({type: "DIRECTORY_DOWN", payload: name});
    }
    return(
        <>
            {DirectoryState.state.files.length > 0 &&
                DirectoryState.state.files.map((filename, index) => (
                    <File
                        key={filename+index}
                        name={filename}
                    />
                ))
            }
            {DirectoryState.state.folders.length > 0 &&
                DirectoryState.state.folders.map((folderName, index) => (
                    <Folder
                        key={folderName+index}
                        name={folderName}
                        handleFolderClick={handleFolderClick}
                    />
                ))
            }
        </>
    );
}

export default DirectoryView;
