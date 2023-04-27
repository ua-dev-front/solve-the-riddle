import { useState } from "react";
import './styles.css';

export type Props = {
    inputValue?: string;
    onChange?: (value: string) => void;
};

function Input({ inputValue, onChange }: Props) {
    const [value, setValue] = useState(inputValue || "");

    return (
        <input
            className="input" type="text" name="answer" value={value} onChange={(event) => {
                if (onChange) {
                    onChange(event.target.value);
                    setValue(event.target.value);
                }
            }}
        />
    );
}

export default Input;
