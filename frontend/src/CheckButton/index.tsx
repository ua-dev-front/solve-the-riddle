import './styles.css';
import Arrow from './arrow.svg';

function CheckButton() {
    return (
        <button className="CheckButton">
            <img className="CheckButton_arrow" src={Arrow} alt="Arrow" />
        </button>
    );
}

export default CheckButton;
