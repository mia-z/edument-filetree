import React from 'react';
import { Link } from "react-router-dom";

export const Folder = ({name, handleFolderClick}) => {

    return(
        <div onClick={() => handleFolderClick(name)}>
            {name}
        </div>
    );
}

export default Folder;
