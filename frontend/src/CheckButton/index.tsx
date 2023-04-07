import Arrow from './arrow.svg';
import './styles.css';

interface Props {
    onClick: () => void;
}

function Button({onClick}: Props) {
    return (
        <button className="button">
            <img className="button_img" src={Arrow} alt="Go" onClick={onClick} />
        </button>
    );
}

export default Button;