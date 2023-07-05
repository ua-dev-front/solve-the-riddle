import { useState, useEffect } from 'react';
import AnswerIndicator, { IndicatorType } from '../AnswerIndicator';
import ExpanderButton from '../ExpanderButton';
import Input from '../Input';
import './styles.css';

const localURL = 'http://127.0.0.1:5000/verifyAnswer?';

export type RiddleProps = {
    riddle: string;
    id: number;
    creationDate: Date;
};

type Props = RiddleProps;

function Riddle({ riddle, id, creationDate }: Props) {
    const [answer, setAnswer] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [indicator, setIndicator] = useState(IndicatorType.Button);
    const [answerBlockHeight, setAnswerBlockHeight] = useState(0);

    const buttonText = isExpanded ? 'ah, forget it!' : 'take a guess';

    async function verify(id: number) {
        setIndicator(IndicatorType.Preloader);
        const initialResponse = await fetch(
            localURL + new URLSearchParams({
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
        const response = await initialResponse.json();
        setIndicator(response['correct'] ? IndicatorType.Checkmark : IndicatorType.Cross);
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
                <Input value={answer}
                       onChange={(newAnswer) => {
                           setAnswer(newAnswer);
                           if (indicator === IndicatorType.Cross) {
                               setIndicator(IndicatorType.Button);
                           }
                       }}
                />
                <AnswerIndicator indicator={indicator} onClick={() => verify(id)} disabled={answer.length === 0} />
            </div>
        </div>
    );
}

export default Riddle;
