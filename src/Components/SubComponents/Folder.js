import React, { useState } from 'react';
import OptionsButton from "./OptionsButton";
import ContextualOverlay from "./ContextualOverlay";

export const Folder = ({folder, handleFolderClick, DispatchContext}) => {
    const [selected, setSelected] = useState(false);

    const handleOptionsClick = () => setSelected(!selected);

    return(
        <div className={"directory-item folder"}>
            <OptionsButton click={() => handleOptionsClick()} isActive={selected}/>
            <ContextualOverlay selected={selected} objectProps={folder} hideContextual={() => setSelected(false)} DispatchContext={DispatchContext}/>
            <i className={`mt-4 far fa-folder fa-5x`} onClick={() => handleFolderClick(folder.Name)} />
            <div className={"trunc-container"}>
                <div className={"file-name"}>
                    {folder.Name}
                </div>
            </div>
        </div>
    );
}

export default Folder;
