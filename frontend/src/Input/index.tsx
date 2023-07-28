import React from 'react';
import './styles.css';

export type Props = {
    value?: string;
    onChange?: (value: string) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled: boolean;
};

function Input({ value, onChange, onKeyPress, disabled }: Props) {
    return (
        <input
            className="input" type="text" name="answer" value={value}
            onChange={(event) => onChange?.(event.target.value)} disabled={disabled} onKeyPress={onKeyPress}
        />
    );
}

export default Input;
