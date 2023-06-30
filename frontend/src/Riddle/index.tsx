import {useState} from "react";
import AnswerIndicator, {IndicatorType} from '../AnswerIndicator';
import ExpanderButton from '../ExpanderButton';
import Input from '../Input';
import './styles.css';

export type RiddleProps = {
    riddle: string;
    id: number;
    creationDate: Date;
};

type Props = RiddleProps;

function Riddle({riddle, id, creationDate}: Props) {
    const [answer, setAnswer] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [indicator, setIndicator] = useState(IndicatorType.Button);
    const [disabled, setDisabled] = useState(false);

    const buttonText = isExpanded ? 'ah, forget it!' : 'take a guess';

    async function verify() {
        console.log('clicked');
    }

    return (
        <div className={`riddle ${isExpanded ? 'expanded' : ''}`}>
            <div className="riddle_date">#{id}, {creationDate.toLocaleDateString()}</div>
            <div className={`riddle_block ${isExpanded ? 'expanded' : ''}`}>
                <div className="riddle_text">{riddle}</div>
                <div className="riddle_expander">
                    <ExpanderButton text={buttonText} isExpanded={isExpanded}
                                    onClick={(isExpanded) => setIsExpanded(isExpanded)} />
                </div>
            </div>
            {isExpanded ? (
                <div className="riddle_answerBlock">
                    <Input value={answer} onChange={(newAnswer) => setAnswer(newAnswer)}  />
                    <AnswerIndicator indicator={indicator} onClick={verify} disabled={disabled}/>
                </div>
            ) : null}
        </div>
    );
}

export default Riddle;
