import Arrow from './arrow.svg';
import './styles.css';


interface Props {
    onClick?: (isContentOpen: boolean) => void;
    isContentOpen: boolean;
    answer?: boolean;
    text: string[];
}

function ExpanderButton({text, onClick, answer, isContentOpen}: Props) {
    const arrow = isContentOpen ? 'up' : 'down';
    const buttonText = answer ? text[0]: text[1];

    return (
        <button className="expanderButton" onClick={() => onClick?.(!isContentOpen)} >
            {buttonText}<img className={`expanderButton-${arrow}`} src={Arrow} alt="Go" />
        </button>
    );
}

export default ExpanderButton;
