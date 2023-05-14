import Arrow from './arrow.svg';
import './styles.css';


interface Props {
    onClick?: (isExpanded: boolean) => void;
    isExpanded: boolean;
    text: string;
}

function ExpanderButton({text, onClick, isExpanded}: Props) {
    const arrow = isExpanded ? 'up' : 'down';

    return (
        <button className="expanderButton" onClick={() => onClick?.(!isExpanded)} >
            {text}
            <div className="expanderButton_img">
                <img className={`expanderButton_img-${arrow}`} src={Arrow} alt="Go" />
            </div>
        </button>
    );
}

export default ExpanderButton;
