import React, { useState } from "react";
import RenameModal from "../Components/SubComponents/Modals/RenameModal";
import DeleteModal from "../Components/SubComponents/Modals/DeleteModal";
import CreateObjectModal from "../Components/SubComponents/Modals/CreateObjectModal";

export const useModals = (initialProps = <></>) => {
    const [modalProps, setModalProps] = useState(initialProps);
    const destroy = () => setModalProps(<></>)
    return {
        set: (props) => setModalProps(props),
        render:() => {
            switch (modalProps.type) {
                case "CREATE_FILE": return <CreateObjectModal type={"FILE"} destroy={destroy} {...modalProps} />;
                case "CREATE_FOLDER": return <CreateObjectModal type={"DIRECTORY"} destroy={destroy} {...modalProps} />;
                case "RENAME": return <RenameModal destroy={destroy} {...modalProps} />
                case "DELETE": return <DeleteModal destroy={destroy} {...modalProps} />
                default: return <></>;
            }
        }
    }
}

export default useModals;
