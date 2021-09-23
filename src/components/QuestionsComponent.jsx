import React, {useEffect, useState} from 'react'
import { Preloader } from './Preloader';
import { ResultQuiz } from './Result';

let processLoadig = () => {
    document.getElementById('current-question').style.display = "block";
    document.getElementById('preload-div').style.display = "none";
}

const QuestionsComponent = () => {
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [questionsList, setQuestionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            fetch("/questions.json")
            .then((r) => r.json())
            .then((data) =>{
                setQuestionsList(data.questionsList);
                setLoading(false);
            })
            .catch((e)=>{ console.log(e); })
        },
        []
    );

    const handleClick = () => {
        const rbs = document.querySelectorAll('input[name="chooseAnswer"]');
        let selectedValue;

        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }

        if (selectedValue === questionsList[index].rightAnswer) {
            if (index !== 9) {
                setIndex(index + 1);

                document.getElementById('current-question').style.display = "none";
                document.getElementById('preload-div').style.display = "block";
                setTimeout(processLoadig, 500);
            }

            setPoints(points + 1);
        } else if (selectedValue !== undefined) {
            if (index !== 9) {
                setIndex(index + 1);

                document.getElementById('current-question').style.display = "none";
                document.getElementById('preload-div').style.display = "block";
                setTimeout(processLoadig, 500);
            }
        } else {
            alert('Choose answer!')
        }

        if (index === 9) {
            document.getElementById('question-div').removeChild(document.getElementById('current-question'));
            document.getElementById('result-div').style.display = "block";
            return 0;
        }

        document.querySelectorAll('input[name="chooseAnswer"]')[0].checked = false;
        document.querySelectorAll('input[name="chooseAnswer"]')[1].checked = false;
        document.querySelectorAll('input[name="chooseAnswer"]')[2].checked = false;
        document.querySelectorAll('input[name="chooseAnswer"]')[3].checked = false;
    }

    if (loading) return (<div></div>);
    return (
        <div id = "question-div">
                         <div id = "progress-bar">
                             <div id = "progress-state" style = {{width: 'calc(' + 100+'% * ('+ points + ' / 10))'}}></div>
                         </div>

                         <div id="current-question">
                             <h6>Question {index + 1}:</h6>
                             <p>{questionsList[index].question}</p>

                             <form action="">
                                 <input type="radio" name="chooseAnswer" id="firstVersion" value={questionsList[index].answers[0]} />
                                 <label htmlFor="firstVersion">{questionsList[index].answers[0]}</label><br/>
                                 <input type="radio" name="chooseAnswer" id="secondVersion" value={questionsList[index].answers[1]} />
                                 <label htmlFor="secondVersion">{questionsList[index].answers[1]}</label><br/>
                                 <input type="radio" name="chooseAnswer" id="thirdVersion" value={questionsList[index].answers[2]} />
                                 <label htmlFor="thirdVersion">{questionsList[index].answers[2]}</label><br/>
                                 <input type="radio" name="chooseAnswer" id="fourthVersion" value={questionsList[index].answers[3]} />
                                 <label htmlFor="fourthVersion">{questionsList[index].answers[3]}</label><br/>
                             </form>

                             <button id="btn-answer" onClick = {handleClick} type="button" className="btn btn-success">Next</button>
                         </div>

                         <Preloader />
                         <ResultQuiz points = {points}/>
                     </div>
    );
}

export default QuestionsComponent