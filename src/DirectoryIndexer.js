import IndexedObject from "./Entities/IndexedObject";

//A small method for converting an array of strings (paths) into objects that represent a file or folder and where they are in relation to a directory tree
//This wouldn't be ideal for a large scale system, but works fine for smaller datasets.
//This works first by taking the string (path) in each array entry and splitting them at every instance of "/" and adding them to a new array.
//These strings are then mapped to objects which describe their depth the "parent" folder, whether it's a folder/file and it's name.
export const TreeIndexer = (arrayOfPaths) => {
    //Initialize the empty return object
    let indexedObjects = [];
    //Create a new array here which splits the strings into arrays at the "/"
    const stringsAsArrays = arrayOfPaths.map(str => str.split("/"));
    //Begin looping through each array of arrays; the "outer" array.
    stringsAsArrays.forEach((array, outerIndex) =>
        //Then loop through the "inner" array where the strings are.
        array.forEach((str, innerIndex) => {
            //Check if the string-as-an-object already exists by comparing type, depth and folder it resides in.
            //If a match is found, we return early
            if (indexedObjects.some(item => item.Name === str && item.Depth === innerIndex && (item.BelongsTo === array[innerIndex-1] || item.BelongsTo === "root")))
                return;
            //If the indexed item doesnt exist we create it here.
            indexedObjects.push(new IndexedObject(
                str.match(/[a-zA-Z0-9]+[.][a-zA-Z0-9]{1,5}/g) ? "FILE" : "DIRECTORY",
                str,
                innerIndex,
                innerIndex === 0 ? "root" : array[innerIndex-1]
            ));
        }
    ));
    return indexedObjects;
}

export const GetIndexedFiles = (indexedObjects, currentDir, depth) =>
    indexedObjects.filter((file, index) => file.Type === "FILE" && file.Depth === depth && file.BelongsTo === currentDir);

export const GetIndexedDirectories = (indexedObjects, currentDir, depth) =>
    indexedObjects.filter((file, index) => file.Type === "DIRECTORY" && file.Depth === depth && file.BelongsTo === currentDir);


