import React from 'react';

export const Folder = ({name, handleFolderClick}) => {

    return(
        <div onClick={() => handleFolderClick(name)}>
            {name}
        </div>
    );
}

export default Folder;
