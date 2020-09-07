import React from 'react';

export const FilePath = ({path}) => {
    return (
        <>
            {
                path.map((str, index) => (
                    <span key={str+index}>/{str}</span>
                ))
            }
        </>
    );
}

export default FilePath;
