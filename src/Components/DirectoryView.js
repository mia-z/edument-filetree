import React from 'react';
import File from "./SubComponents/File";
import Folder from "./SubComponents/Folder";

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
                        name={filename.Name}
                    />
                ))
            }
            {DirectoryState.state.folders.length > 0 &&
                DirectoryState.state.folders.map((folderName, index) => (
                    <Folder
                        key={folderName+index}
                        name={folderName.Name}
                        handleFolderClick={handleFolderClick}
                    />
                ))
            }
        </>
    );
}

export default DirectoryView;
