import React, { useState } from "react";
import "../../scss/ContextualOverlay.scss";
import ConfirmModal from "./ConfirmModal";

export const ContextualOverlay = ({objectProps, selected, hideContextual, DispatchContext}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalProps, setModalProps] = useState({});

    const handleRename = () => {
        setModalProps({
            type: "rename",
            dispatch: DispatchContext,
            dismissModal: () => setShowModal(false),
            objectProps: objectProps
        });
        setShowModal(true);
        hideContextual();
    }

    const handleDelete = () => {
        setModalProps({
            type: "delete",
            dispatch: DispatchContext,
            dismissModal: () => setShowModal(false),
            objectProps: objectProps
        });
        setShowModal(true);
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
            <ConfirmModal visible={showModal} {...modalProps} />
        </>
    )
}

export default ContextualOverlay;
