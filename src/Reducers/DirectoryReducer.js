import directoryStrings from "../strings";
import { TreeIndexer, GetIndexedDirectories, GetIndexedFiles } from "../DirectoryIndexer";
import IndexedObject from "../Entities/IndexedObject";

const indexedObjects = TreeIndexer(directoryStrings);

//Initial state of the app that the reducer will control
export const initialState = {
    //The string paths to use - hardcoded ones, more can be added at runtime
    indexedObjects: indexedObjects,
    //Tracks the current path the user is on
    currentPath: ["root"],
    //Shortcut for returning current folder name
    currentFolder: "root",
    //The found folder objects
    folders: GetIndexedDirectories(indexedObjects, "root", 0),
    //The found file object
    files: GetIndexedFiles(indexedObjects, "root", 0),
    //The directory depth
    depth: 0,
}

//Initially I had a lot of individual state values via the useState hook, but it got messy pretty quickly.
//Decided to refactor into a reducer which passes the state down where it is needed.
//It is much easier to manage a single source of truth rather than a whole bunch of them.
export const DirectoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case "DIRECTORY_DOWN":
            const DIR_DOWN_folders = [...GetIndexedDirectories(state.indexedObjects, action.payload, state.depth + 1)];
            const DIR_DOWN_files = [...GetIndexedFiles(state.indexedObjects, action.payload, state.depth + 1)];
            return { ...state,
                currentPath: [...state.currentPath, action.payload],
                currentFolder: action.payload,
                depth: state.depth + 1,
                folders: [...DIR_DOWN_folders],
                files: [...DIR_DOWN_files] };

        case "DIRECTORY_UP":
            //FIX THIS
            const DIR_UP_folders = [...GetIndexedDirectories(state.indexedObjects, state.currentPath[state.depth - 1], state.depth - 1)];
            const DIR_UP_files = [...GetIndexedFiles(state.indexedObjects, state.currentPath[state.depth - 1], state.depth - 1)];
            return { ...state,
                currentPath: state.depth < 1 ? [ "root" ] : state.currentPath.filter(path => path !== state.currentFolder),
                currentFolder: state.currentPath[state.depth - 1],
                depth: state.depth < 1 ? 0 : state.depth - 1,
                folders: [...DIR_UP_folders],
                files: [...DIR_UP_files] };

        case "DIRECTORY_CREATE":
            const newDirectory = new IndexedObject("DIRECTORY", action.payload, state.depth, state.currentFolder);
            const DIR_CREATE_objects = [...state.indexedObjects, newDirectory];
            const DIR_CREATE_folders = [...GetIndexedDirectories(DIR_CREATE_objects, state.currentFolder, state.depth)];
            const DIR_CREATE_files = [...GetIndexedFiles(DIR_CREATE_objects, state.currentFolder, state.depth)];
            return {...state,
                indexedObjects: [...DIR_CREATE_objects],
                folders: [...DIR_CREATE_folders],
                files: [...DIR_CREATE_files] };

        case "FILE_CREATE":
            const newFile = new IndexedObject("FILE", action.payload, state.depth, state.currentFolder);
            const FILE_CREATE_objects = [...state.indexedObjects, newFile];
            const FILE_DIR_CREATE_folders = [...GetIndexedDirectories(FILE_CREATE_objects, state.currentFolder, state.depth)];
            const FILE_DIR_CREATE_files = [...GetIndexedFiles(FILE_CREATE_objects, state.currentFolder, state.depth)];
            return {...state,
                indexedObjects: [...FILE_CREATE_objects],
                folders: [...FILE_DIR_CREATE_folders],
                files: [...FILE_DIR_CREATE_files] };

        default: throw new Error("Invalid action in DirectoryReducer");
    }
}
