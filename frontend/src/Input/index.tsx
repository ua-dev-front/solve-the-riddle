import {ChangeEvent} from 'react';
import './styles.css';

export type Props = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Input({onChange}: Props) {
    return (
        <input className="input_answer" type='text' name='answer' onChange={onChange}/>
    );
}

export default Input;
