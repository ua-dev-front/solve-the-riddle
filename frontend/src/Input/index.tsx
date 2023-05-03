import './styles.css';

export type Props = {
    value?: string;
    onChange?: (value: string) => void;
};

function Input({ value, onChange }: Props) {
    return (
        <input
            className="input" type="text" name="answer" value={value}
            onChange={(event) => onChange?.(event.target.value)}
        />
    );
}

export default Input;
