import Arrow from './arrow.svg';
import './styles.css';

function Button() {
    return (
        <button className="button">
            <img className="button_arrow" src={Arrow} alt="Arrow" />
        </button>
    );
}

export default Button;
