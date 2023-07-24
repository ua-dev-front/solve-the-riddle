import Checkmark from './Checkmark.svg';
import Cross from './Cross.svg';
import Preloader from './Preloader.svg';
import Button from '../Button';
import './styles.css';

export enum AnswerStatus {
    Correct,
    Incorrect,
    Loading,
    Unverified
}

interface BaseProps {
    indicator: AnswerStatus;
}

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
}

type Props = BaseProps & ButtonProps;

function AnswerIndicator({ indicator, onClick, disabled }: Props) {
    const imgIndicator = {
        [AnswerStatus.Correct]: [Checkmark, 'Correct'],
        [AnswerStatus.Incorrect]: [Cross, 'Incorrect'],
        [AnswerStatus.Loading]: [Preloader, 'Loading...'],
    };

    return (
        <div className="answer-indicator">
            {indicator === AnswerStatus.Unverified ? (
                <Button onClick={onClick} disabled={disabled} />
            ) : (
                <img src={imgIndicator[indicator][0]} alt={imgIndicator[indicator][1]} />
            )}
        </div>
    )
}

export default AnswerIndicator;
