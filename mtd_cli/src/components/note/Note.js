import React, {useEffect, useState} from 'react'

export const Note = ({note}) => {
    return(
        <div id={note.id}>
            <h3>Note</h3>
            <p>{note.id}</p>
            <p>{note.name}</p>
            <p>{note.description}</p>
        </div>
    );
}