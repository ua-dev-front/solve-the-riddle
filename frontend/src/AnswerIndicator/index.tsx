import Checkmark from './Checkmark.svg';
import Cross from './Cross.svg';
import Preloader from './Preloader.svg';
import Button from '../Button';
import './styles.css';

export enum AnswerStatus {
    Checkmark,
    Cross,
    Preloader,
    Button
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
        [AnswerStatus.Checkmark]: [Checkmark, 'Correct'],
        [AnswerStatus.Cross]: [Cross, 'Incorrect'],
        [AnswerStatus.Preloader]: [Preloader, 'Loading...'],
    };

    return (
        <div className="answer-indicator">
            {indicator === AnswerStatus.Button ? (
                <Button onClick={onClick} disabled={disabled} />
            ) : (
                <img src={imgIndicator[indicator][0]} alt={imgIndicator[indicator][1]} />
            )}
        </div>
    )

}

export default AnswerIndicator;
