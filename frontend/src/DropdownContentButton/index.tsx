import {useState} from "react";
import ArrowUp from './arrow-up.svg';
import ArrowDown from './arrow-down.svg';
import './styles.css';


interface Props {
    onClick?: () => void;
    answer?: boolean;
}

function DropdownContentButton({onClick, answer}: Props) {
    const [isContentOpen, setIsContentOpen] = useState(false);

    const handleButtonClick = () => {
        setIsContentOpen((open) => !open);
        if (onClick) {
            onClick();
        }
    };

    const arrowImage = isContentOpen ? ArrowUp : ArrowDown;
    const buttonText = answer
        ? isContentOpen ? 'hide answer': 'view answer'
        : isContentOpen ? 'ah, forget it!': 'take a guess';

    return (
        <button className="guessTaker" onClick={handleButtonClick} >
            {buttonText}<img className="guessTaker-img" src={arrowImage} alt="Go" />
        </button>
    );
}

export default DropdownContentButton;
