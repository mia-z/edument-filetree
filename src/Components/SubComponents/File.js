import React, { useState } from 'react';
import OptionsButton from "./OptionsButton";
import ContextualOverlay from "./ContextualOverlay";

export const File = ({file, DispatchContext}) => {
    //The following two variables only assumes that the filename ONLY contains a single (1) period, splitting the name from the extension.
    const filename = file.Name.split(".")[0];
    const fileExtension = file.Name.split(".")[1];

    const [selected, setSelected] = useState(false);

    const getExtensionImage = (extension) => {
        switch (extension) {
            case "txt": return "fa-file-alt";
            case "png":
            case "jpg":
            case "jpeg":
            case "bmp": return "fa-file-image";
            case "zip":
            case "rar":
            case "7z":
            case "gzip": return "fa-file-archive";
            default: return "fa-file";
        }
    }

    const handleOptionsClick = () => setSelected(!selected);

    return(
        <div className={"directory-item"}>
            <OptionsButton click={() => handleOptionsClick()} isActive={selected}/>
            <ContextualOverlay selected={selected} objectProps={file} hideContextual={() => setSelected(false)} DispatchContext={DispatchContext}/>
            <i className={`mt-3 far ${getExtensionImage(fileExtension)} fa-5x`} />
            <div className={"trunc-container"}>
                <div className={"file-name"}>
                    {filename}.
                </div>
                <div className={"file-extension"}>
                    {fileExtension}
                </div>
            </div>
        </div>
    );
}

export default File;
