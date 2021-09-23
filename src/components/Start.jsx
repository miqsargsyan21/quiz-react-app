import React from 'react';
import { startingQuiz } from './Starting';

const Start = () => {
    return (
        <main id = "main-content">
            <button id = "button-start" onClick = {startingQuiz} type="button" className="btn btn-success">Start</button>
        </main>
    );
}


export default Start;