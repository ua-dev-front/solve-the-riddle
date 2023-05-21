import Checkmark from './Checkmark.svg';
import Cross from './Cross.svg';
import Preloader from './Preloader.svg';
import Button from '../Button';
import './styles.css';

export enum IndicatorType {
    Checkmark,
    Cross,
    Preloader,
    Button
}

interface BaseProps {
    indicator: IndicatorType;
}

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
}

type Props = BaseProps & ButtonProps;

function AnswerIndicator({ indicator, onClick, disabled }: Props) {
    if (indicator === IndicatorType.Button) {
        return <Button onClick={onClick} disabled={disabled} />;
    } else {

        const imgIndicator = {
            [IndicatorType.Checkmark]: [Checkmark, 'Correct'],
            [IndicatorType.Cross]: [Cross, 'Incorrect'],
            [IndicatorType.Preloader]: [Preloader, '...Loading'],
        };

        return <img className="answerIndicator-img" src={imgIndicator[indicator][0]} alt={imgIndicator[indicator][1]} />;
    }
}

export default AnswerIndicator;
