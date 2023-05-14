import Arrow from './arrow.svg';
import './styles.css';

interface Props {
    onClick?: (isExpanded: boolean) => void;
    isExpanded: boolean;
    text: string;
}

function ExpanderButton({ text, onClick, isExpanded }: Props) {
    const arrow = isExpanded ? 'up' : 'down';

    return (
        <button className="expanderButton" onClick={() => onClick?.(!isExpanded)}>
            {text}<img className={`expanderButton_img expanderButton_img--${arrow}`} src={Arrow} alt="Go" />
        </button>
    );
}

export default ExpanderButton;
