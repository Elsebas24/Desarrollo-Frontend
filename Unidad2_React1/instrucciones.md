COMANDOS PARA USAR EN LA PRACTICA DE COMPONENTES CON REACT + VITE EN MODO DEVELOPER:

    
    Abrir la terminal en la carpeta donde se va a crear el proyecto:

    Bash:
    $npm create vite@latest . -- --template react
    $npm install
    $run dev


component.jsx

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
            <p>texto Input: {text}</p>
            <p>texto Actualizado: {updated}</p>
        </div>
    );
}

export default Component;

para importarlo usamos:

import Component from './component';

para incrustarlo en App.jsx:
<Component />