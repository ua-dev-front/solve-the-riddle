import React, { useEffect, useState } from 'react';
import AnswerIndicator, {AnswerStatus} from '../AnswerIndicator';
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
    const [indicator, setIndicator] = useState(AnswerStatus.Button);
    const [answerBlockHeight, setAnswerBlockHeight] = useState(0);
    const [disabled, setDisabled] = useState(false);

    let buttonText;
    switch (indicator) {
        case AnswerStatus.Checkmark:
            buttonText = isExpanded ? 'hide answer' : 'view answer';
            break;
        default:
            buttonText = isExpanded ? 'ah, forget it!' : 'take a guess';
            break;
    }


    async function verify(id: number) {
        setIndicator(AnswerStatus.Preloader);
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
        setIndicator(response.correct ? AnswerStatus.Checkmark : AnswerStatus.Cross);
        setDisabled(response.correct);
    }

    useEffect(() => {
        setAnswerBlockHeight(isExpanded ? document.getElementById(`answerBlock-${id}`)?.scrollHeight || 0
            : 0);
    }, [isExpanded, id]);

    return (
        <div className={`riddle ${isExpanded ? 'expanded' : ''}`}>
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
                <Input value={answer} disabled={disabled}
                       onChange={(newAnswer) => {
                           setAnswer(newAnswer);
                           if (indicator === AnswerStatus.Cross) {
                               setIndicator(AnswerStatus.Button);
                           }
                       }}
                       onKeyPress={(event) => {
                           if (event.key === 'Enter' && answer.trim() !== '') {
                               verify(id);
                           }
                       }}
                />
                <AnswerIndicator indicator={indicator} onClick={() => verify(id)} disabled={answer.trim() === ''}/>
            </div>
        </div>
    );
}

export default Riddle;
