import React from "react";
import "../../scss/OptionsButton.scss";

export const OptionsButton = ({click, isActive}) => {
    return(
        <div onClick={() => click()} className={"options-button"}>
            {isActive &&
                <i className={"fas fa-times fa-fw"} />
            }
            {!isActive &&
                <i className={"fas fa-ellipsis-h fa-fw"} />
            }
        </div>
    );
}


export default OptionsButton;
