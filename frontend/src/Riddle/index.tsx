import React, { useEffect, useState } from 'react';
import AnswerIndicator, { AnswerStatus } from '../AnswerIndicator';
import ExpanderButton from '../ExpanderButton';
import Input from '../Input';
import './styles.css';

interface ResponseData {
    correct: boolean;
}

export type RiddleProps = {
    riddle: string;
    id: number;
    creationDate: Date;
};

function Riddle({ riddle, id, creationDate }: RiddleProps) {
    const [answer, setAnswer] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [indicator, setIndicator] = useState(AnswerStatus.Unverified);
    const [answerBlockHeight, setAnswerBlockHeight] = useState(0);
    const [disabled, setDisabled] = useState(false);

    let buttonText;
    if (indicator === AnswerStatus.Correct) {
        buttonText = isExpanded ? 'hide answer' : 'view answer';
    } else {
        buttonText = isExpanded ? 'ah, forget it!' : 'take a guess';
    }

    async function verify(id: number) {
        setIndicator(AnswerStatus.Loading);
        setDisabled(true);
        const initialResponse = await fetch(
            `${process.env.REACT_APP_URL}/verifyAnswer?` + new URLSearchParams({
                id: id.toString(),
                answer,
            }),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const response: ResponseData = await initialResponse.json();
        setIndicator(response.correct ? AnswerStatus.Correct : AnswerStatus.Incorrect);
        setDisabled(response.correct);
        if (!response.correct) {
            const riddleBlock = document.querySelector('.incorrect .riddle_block') as HTMLElement;
            const riddleAnswerBlock = document.querySelector('.incorrect .riddle_answerBlock') as HTMLElement;

            // Додаємо клас "animate" для запуску анімації
            if (riddleBlock) {
                riddleBlock.classList.add('animate');
                setTimeout(() => {
                    riddleBlock.classList.remove('animate');
                }, 300);
            }

            if (riddleAnswerBlock) {
                riddleAnswerBlock.classList.add('animate');
                setTimeout(() => {
                    riddleAnswerBlock.classList.remove('animate');
                }, 300);
            }
        }
    }

    function isAnswerValid() {
        return answer.trim() !== '';
    }

    useEffect(() => {
        setAnswerBlockHeight(isExpanded ? document.getElementById(`answerBlock-${id}`)?.scrollHeight || 0
            : 0);
    }, [isExpanded, id]);

    const riddleClassName = `${isExpanded ? 'expanded' : ''} ${
        indicator === AnswerStatus.Correct ? 'correct' : indicator === AnswerStatus.Incorrect ? 'incorrect' : 'static'
    }`;
    console.log(riddleClassName)

    return (
        <div className={`riddle ${riddleClassName}`}>
            <div className="riddle_date">#{id}, {new Date(creationDate).toLocaleDateString()}</div>
            <div className={`riddle_block ${isExpanded ? 'expanded' : ''}`}>
                <div className="riddle_text">{riddle}</div>
                <div className="riddle_expander">
                    <ExpanderButton text={buttonText} isExpanded={isExpanded}
                        onClick={async (isExpanded) => {
                            setIsExpanded(isExpanded);
                            setTimeout(() => 200);
                        }}
                    />
                </div>
            </div>
            <div className={`riddle_answerBlock ${isExpanded ? 'expanded' : ''}`}
                 style={{ height: `${answerBlockHeight}px` }} id={`answerBlock-${id}`}>
                <div className="riddle_answerLine"></div>
                <Input value={answer} disabled={disabled}
                       onChange={(newAnswer) => {
                           setAnswer(newAnswer);
                           if (indicator === AnswerStatus.Incorrect) {
                               setIndicator(AnswerStatus.Unverified);
                           }
                       }}
                       onKeyPress={(event) => {
                           if (event.key === 'Enter' && isAnswerValid()) {
                               verify(id);
                           }
                       }}
                />
                <AnswerIndicator indicator={indicator} onClick={() => verify(id)} disabled={!isAnswerValid()}/>
            </div>
        </div>
    );
}

export default Riddle;
