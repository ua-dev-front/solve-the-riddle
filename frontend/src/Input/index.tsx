import './styles.css';

export type Props = {
    answer?: string;
};

function Input({answer}: Props) {
    return (
        <input type='text' name='answer' defaultValue={answer}/>
    );
}

export default Input;
