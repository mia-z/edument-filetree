import directoryStrings from "../strings";
import { DirectoryBuilder as builder } from "../DirectoryBuilder";

const dir = builder();

//Initial state of the app that the reducer will control
export const initialState = {
    //The string paths to use - hardcoded ones, more can be added at runtime
    paths: [...directoryStrings],
    //Tracks the current path the user is on
    currentPath: ["root"],
    //Shortcut for returning current folder name
    currentFolder: "root",
    //The found folder objects
    folders: [...dir.folders],
    //The found file object
    files: [...dir.files],
    //The directory depth
    depth: 0,
}

//Initially I had a lot of individual state values via the useState hook, but it got messy pretty quickly.
//Decided to refactor into a reducer which passes the state down where it is needed.
//It is much easier to manage a single source of truth rather than a whole bunch of them.
export const DirectoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case "DIRECTORY_DOWN":
            const DIR_DOWN = builder(state.paths, action.payload, state.depth + 1)
            return { ...state,
                currentPath: [...state.currentPath, action.payload],
                currentFolder: action.payload,
                depth: state.depth + 1,
                folders: [...DIR_DOWN.folders],
                files: [...DIR_DOWN.files] };

        case "DIRECTORY_UP":
            const DIR_UP = builder(state.paths, state.currentPath[state.depth - 1], state.depth - 1)
            return { ...state,
                currentPath: state.depth < 1 ? [ "root" ] : state.currentPath.filter(path => path !== state.currentFolder),
                currentFolder: state.currentPath[state.depth - 1],
                depth: state.depth < 1 ? 0 : state.depth - 1,
                folders: [...DIR_UP.folders],
                files: [...DIR_UP.files] };

        default: throw new Error("Invalid action in DirectoryReducer");
    }
}
