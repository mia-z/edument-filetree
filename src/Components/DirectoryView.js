import React from 'react';
import File from "./File";
import Folder from "./Folder";

export const DirectoryView = ({files, folders, setCurrentFolder, depth, setDepth}) => {

    const handleFolderClick = (name) => {
        setCurrentFolder(name)
        setDepth(depth + 1);
    }

    return(
        <>
            {files.length > 0 &&
                files.map((filename, index) => (
                    <File
                        key={filename+index}
                        name={filename}
                    />
                ))
            }
            {folders.length > 0 &&
                folders.map((folderName, index) => (
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
