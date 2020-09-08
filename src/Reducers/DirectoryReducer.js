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
            const DIR_UP_folders = [...GetIndexedDirectories(state.indexedObjects, state.currentPath[state.depth - 1], state.depth - 1)];
            const DIR_UP_files = [...GetIndexedFiles(state.indexedObjects, state.currentPath[state.depth - 1], state.depth - 1)];
            return { ...state,
                //NOTE: this ternary doesnt even need to be here any more, I just like ternaries
                currentPath: state.depth < 1 ? [ "root" ] : state.currentPath.filter(path => path !== state.currentFolder),
                currentFolder: state.currentPath[state.depth - 1],
                depth: state.depth < 1 ? 0 : state.depth - 1,
                folders: [...DIR_UP_folders],
                files: [...DIR_UP_files] };

        case "DIRECTORY_JUMP":
            const DIR_JUMP_folders = [...GetIndexedDirectories(state.indexedObjects, action.payload.currentFolder, action.payload.depth)];
            const DIR_JUMP_files = [...GetIndexedFiles(state.indexedObjects, action.payload.currentFolder, action.payload.depth)];
            return { ...state,
                currentPath: action.payload.currentPath,
                currentFolder: action.payload.currentFolder,
                depth: action.payload.depth,
                folders: [...DIR_JUMP_folders],
                files: [...DIR_JUMP_files] };

        case "OBJECT_CREATE":
            const newDirectory = new IndexedObject(action.payload.type, action.payload.name, state.depth, state.currentFolder);
            const OBJ_CREATE_objects = [...state.indexedObjects, newDirectory];
            const OBJ_CREATE_folders = [...GetIndexedDirectories(OBJ_CREATE_objects, state.currentFolder, state.depth)];
            const OBJ_CREATE_files = [...GetIndexedFiles(OBJ_CREATE_objects, state.currentFolder, state.depth)];
            return {...state,
                indexedObjects: [...OBJ_CREATE_objects],
                folders: [...OBJ_CREATE_folders],
                files: [...OBJ_CREATE_files] };

        case "OBJECT_DELETE":
            const objectToDeleteRef = state.indexedObjects.find(obj =>
                obj.Name === action.payload.Name &&
                obj.Depth === action.payload.Depth &&
                obj.BelongsTo === action.payload.BelongsTo &&
                obj.Type === action.payload.Type);
            if (!objectToDeleteRef)
                throw new Error("Exception when trying to delete a file/folder - not found");

            let OBJ_DELETE_objects = state.indexedObjects.filter(obj => obj !== objectToDeleteRef);

            //Recursively remove all folders/files underneath the deleted folder
            if (action.payload.Type === "DIRECTORY") {
                //The actual set of folders we're going to remove
                let collectionToRemove = [];
                //A temporary list of folders under the current searched folder - to avoid exponential recursion checking
                let foldersUnder = [];
                //Where we're starting
                const folderToStartAt = action.payload.Name;
                //The depth we're starting at
                const depthToStartAt = action.payload.Depth;
                //Calculate the highest possible depth of the filesystem
                const highestDepth = state.indexedObjects.map(obj => obj.Depth).reduce((lastLargest, currentLargest) =>
                     currentLargest > lastLargest ?  currentLargest : lastLargest);

                //Starting at the top, we get the first set of folders we're going to search until we hit the max.
                for (let x = depthToStartAt; x < highestDepth; x++) {
                    if (x === depthToStartAt) {
                        //Temporary reference for our temporary list
                        let foundFoldersUnderStart = state.indexedObjects.filter(obj =>
                            obj.Depth === depthToStartAt + 1 && obj.BelongsTo === folderToStartAt && obj.Type === "DIRECTORY");
                        //Spread the found ones and remap only the data we're gonna use
                        foldersUnder = [...foldersUnder, ...foundFoldersUnderStart.map(folder => { return { Name: folder.Name, Depth: folder.Depth, BelongsTo: folder.BelongsTo } })];
                        //Spread the results to our final list
                        collectionToRemove = [...foldersUnder];
                    }
                    //Check through the folders UNDER the current folder being searched
                    for (let folder of foldersUnder) {
                        //Removed the folder from our temp list, to avoid infinite recursion
                        foldersUnder = [...foldersUnder.filter(searchedFolder => searchedFolder.Name !== folder.Name)];
                        //Check if there's folders matching our criteria (matching depth and belong to the previous folder)
                        foldersUnder = [...foldersUnder, ...state.indexedObjects
                            .filter(obj => obj.Depth === folder.Depth + 1 && obj.BelongsTo === folder.Name && obj.Type === "DIRECTORY")
                            .map(folder => { return { Name: folder.Name, Depth: folder.Depth, BelongsTo: folder.BelongsTo } })];
                        //Spread 'em!
                        collectionToRemove = [...collectionToRemove, ...foldersUnder];
                    }

                }
                //We have recursively removed folders under a folder, without removing other folders on a parallel depth
                //This doesnt have to be done for files since we can just compare which folder the file resides in and the depth.
                OBJ_DELETE_objects = OBJ_DELETE_objects.filter(object => {
                   let found = false;
                   //Re-add the initially removed folder so we get a reference to FILES in that folder
                   collectionToRemove = [...collectionToRemove, objectToDeleteRef];
                   collectionToRemove.forEach(objectsToRemove => {
                      if ((object.Name === objectsToRemove.Name &&
                          object.Depth === objectsToRemove.Depth &&
                          object.BelongsTo === objectsToRemove.BelongsTo &&
                          object.Type === "DIRECTORY") ||
                          (object.Depth === objectsToRemove.Depth + 1 &&
                          object.BelongsTo === objectsToRemove.Name &&
                          object.Type === "FILE"))
                          found = true;
                   });
                   if (found)
                       return false;
                   else
                       return object;
                });
                console.log(OBJ_DELETE_objects);
            }

            const OBJ_DELETE_folders = [...GetIndexedDirectories(OBJ_DELETE_objects, state.currentFolder, state.depth)];
            const OBJ_DELETE_files = [...GetIndexedFiles(OBJ_DELETE_objects, state.currentFolder, state.depth)];

            return {...state,
                indexedObjects: [...OBJ_DELETE_objects],
                folders: [...OBJ_DELETE_folders],
                files: [...OBJ_DELETE_files] };

        case "OBJECT_RENAME":
            const objectToRenameRef = state.indexedObjects.find(obj =>
                obj.Name === action.payload.Name &&
                obj.Depth === action.payload.Depth &&
                obj.BelongsTo === action.payload.BelongsTo &&
                obj.Type === action.payload.Type);
            if (!objectToRenameRef)
                throw new Error("Exception when trying to rename a file/folder - not found");

            //Since my indexing system here relies on directories at certain depths having a known folder they belong to
            //the folders underneath the folder we're renaming also need their "BelongsTo" property updating
            //I will implement a similar method as used in the OBJECT_REDUCE action, except it only needs to check 1 folder deep
            //First the renamed object is removed
            let OBJECT_RENAME_objects = state.indexedObjects.filter(obj => obj !== objectToRenameRef);

            //A new object is create with the updated values
            const renamedObject = new IndexedObject(action.payload.Type, action.payload.newName, action.payload.Depth, action.payload.BelongsTo);

            //We update the children's "BelongsTo" of the new file - making new copies of them instead of mutating
            const updatedChildObjects = state.indexedObjects
                .filter(obj => obj.Depth === renamedObject.Depth + 1 && obj.BelongsTo === objectToRenameRef.Name)
                .map(obj => { return new IndexedObject(obj.Type, obj.Name, obj.Depth, renamedObject.Name) });

            //We get the rest of the objects that were not touched
            const unchangedObjects = state.indexedObjects
                .filter(obj => obj.BelongsTo !== objectToRenameRef.Name && obj !== objectToRenameRef);

            //Spread 'em all together, and..
            OBJECT_RENAME_objects = [...updatedChildObjects, ...unchangedObjects, renamedObject];

            //Map them into a nice renamed sandwich!
            const OBJECT_RENAME_folders = [...GetIndexedDirectories(OBJECT_RENAME_objects, state.currentFolder, state.depth)];
            const OBJECT_RENAME_files = [...GetIndexedFiles(OBJECT_RENAME_objects, state.currentFolder, state.depth)];
            return {...state,
                indexedObjects: [...OBJECT_RENAME_objects],
                folders: [...OBJECT_RENAME_folders],
                files: [...OBJECT_RENAME_files] };

        default: throw new Error("Invalid action in DirectoryReducer");
    }
}
