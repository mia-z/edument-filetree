import directoryStrings from "./strings";

export const DirectoryBuilder = (strings = directoryStrings, currentFolder = "root", depth = 0) => {
    if (currentFolder === "root" || depth === 0) {
        //since we're in the root, take the first name of each path
        const rootPathArrays = strings.map(str => str.split("/")[0]);

        //remove duplicates easily by creating a Set -- Set can only contain unique values. Spread these values into an array to get the unique names (similar to DISTINCT)
        const rootItems = [...new Set(rootPathArrays)];

        //Set the files and folders by splitting at periods --
        //While directory names can have periods in them, chances are they wont be folders
        //If the array length is more than 1, the string was split by a period and is probably a file
        //If the array length is 1, the string wasn't split by a period and is probably a directory
        let files = rootItems.filter(str => str.split(".").length > 1 ? str : false);
        let folders = rootItems.filter(str => str.split(".").length === 1 ? str : false);

        //Return an object containing two arrays: an array with 'files' and an array with 'folders'
        return {
            files: [...files],
            folders: [...folders]
        }
    } else {

        //Perform two functions on the current set of strings (paths)
        //Firstly filter out so we only get the contents of the folder from our current depth, so depth - 1
        //Extract the names of the contents at the current depth
        //This could've been written a myriad of ways, I personally like chaining array functions, and doesn't become difficult to read if you format it nicely! :)
        const filteredArrays = strings
            .filter(str => str.split("/")[depth - 1] === currentFolder)
            .map(str => str.split("/")[depth]);

        //Break early if theres nothing in the directory
        if (filteredArrays[0] === undefined)
            return {
                files: [],
                folders: []
            }

        //remove duplicates easily by creating a Set -- Set can only contain unique values. Spread these values into an array to get the unique names (similar to DISTINCT)
        const items = [...new Set(filteredArrays)];

        //Same as above in the if clause
        let files = items.filter(str => str.split(".").length > 1 ? str : false);
        let folders = items.filter(str => str.split(".").length === 1 ? str : false);

        //Return an object containing two arrays: an array with 'files' and an array with 'folders'
        return {
            files: [...files],
            folders: [...folders]
        }
    }
}

export default DirectoryBuilder;
