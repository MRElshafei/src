import React, { useState, useRef } from 'react';
import './Quiz.css';
import sample from '../../assets/data.js';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lock, setLock] = useState(false);
    const [degree, setDegree] = useState(false);
    const choices = useRef([]);

    const currentQuestion = sample.questions[index];
    const correctChoice = currentQuestion.correct_choice;

    const checkAns = (e, choiceIndex) => {
        e.preventDefault();
        if (!lock) {
            if (correctChoice === choiceIndex) {
                setScore(score + 1);
                e.target.classList.add("correct");
            } else {
                e.target.classList.add("wrong");
                choices.current[correctChoice - 1].classList.add("correct");
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === sample.questions.length - 1) {
                setDegree(true);
                return;
            }
            setIndex(index + 1);
            setLock(false);
            choices.current.forEach(choice => {
                choice.classList.remove("correct", "wrong");
            });
        }
    };

    const start = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setDegree(false);
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {degree ? (
                <>
                    <h2>You scored {score}/{sample.questions.length}</h2>
                    <button onClick={start}>Start</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {currentQuestion.question}</h2>
                    <ul>
                        {currentQuestion.choices.map((choice, i) => (
                            <li key={i} ref={el => choices.current[i] = el} onClick={e => checkAns(e, i + 1)}>{choice}</li>
                        ))}
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} / {sample.questions.length} questions</div>
                </>
            )}
        </div>
    );


    
}

export default Quiz;
