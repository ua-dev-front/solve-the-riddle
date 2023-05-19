import Checkmark from './Checkmark.svg';
import Cross from './Cross.svg';
import Preloader from './Preloader.svg';
import Button from '../Button';
import './styles.css';

interface Props {
    indicator: string;
    onClick?: () => void;
    disabled?: boolean;
}

function AnswerIndicator({indicator, onClick, disabled}: Props) {
    if (indicator === 'Button') {
        return <Button onClick={onClick} disabled={disabled} />;
    } else {
        return <img src={{ 'Checkmark': Checkmark, 'Cross': Cross, 'Preloader': Preloader }[indicator]} alt="Go" />;
    }
}

export default AnswerIndicator;
