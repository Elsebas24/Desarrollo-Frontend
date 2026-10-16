import React, { useState } from 'react';

const Component = () => {

    const [text, setText] = useState();
    const [updated, setUpdate] = useState();
    const textOnChange = (event) => {
        setText(event.target.value)
    }
    const buttonOnClick = () => {
        setUpdate(text);
    }

    return (
        <div>
            <input type="text" value={text} onChange={textOnChange} />
            <button onClick={buttonOnClick}>actualizar</button>
            <p>Texto Input: {text}</p>
            <p>Texto Actualizado: {updated}</p>
        </div>
    );
}

export default Component;