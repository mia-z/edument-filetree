import React from "react";

export const BoxView = ({children}) => {
    return (
        <div className={"box"}>
            {children}
        </div>
    );
}

export default BoxView;
