import React from "react";
import "../../scss/ContextualOverlay.scss";
import useModals from "../../Hooks/useModals";
export const ContextualOverlay = ({objectProps, selected, hideContextual, DispatchContext}) => {
    const modal = useModals();
    const handleRename = () => {
        modal.set({
            type: "RENAME",
            dispatch: DispatchContext,
            objectProps: objectProps
        });
        hideContextual();
    }

    const handleDelete = () => {
        modal.set({
            type: "DELETE",
            dispatch: DispatchContext,
            objectProps: objectProps
        });
        hideContextual();
    }

    return (
        <>
            <div className={`contextual-overlay ${selected ? "" : "hidden"}`}>
                <div className={`context-button ${selected ? "" : "hidden"}`}>
                    <div className={`context-button-text ${selected ? "" : "hidden"}`} onClick={() => handleRename()}>Rename</div>
                </div>
                <div className={`context-button ${selected ? "" : "hidden"}`}>
                    <div className={`context-button-text ${selected ? "" : "hidden"}`} onClick={() => handleDelete()}>Delete</div>
                </div>
            </div>
            {modal.render()}
        </>
    )
}

export default ContextualOverlay;
