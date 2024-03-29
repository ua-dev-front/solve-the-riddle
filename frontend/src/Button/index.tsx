import Arrow from './arrow.svg';
import './styles.css';

interface Props {
    onClick?: () => void;
    disabled?: boolean;
}

function Button({onClick, disabled}: Props) {
    return (
        <button className={`button ${disabled ? 'button-disabled' : ''}`} disabled={disabled} onClick={onClick} >
            <img className="button_img" src={Arrow} alt="Go" />
        </button>
    );
}

export default Button;
