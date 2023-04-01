import { useState } from 'react';
import Arrow from './arrow.svg';
import Preloader from './preloader.svg';
import './styles.css';

function Button() {
    const [isLoading, setIsLoading] = useState(false);

    async function verify() {
        setIsLoading(true);
        // ...
        setIsLoading(false);
    }

    return (
        <button className={`button ${isLoading ? 'button_loading' : ''}`} onClick={() => verify()}>
            {isLoading ? (
                <img className="button_img" src={Preloader} alt="Loading..."/>
            ) : (
                <img className="button_img" src={Arrow} alt="Go" />
            )}
        </button>
    );
}

export default Button;
