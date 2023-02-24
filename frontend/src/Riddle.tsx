import './riddles.css';

export type Props = {
    riddle: string,
    date: string
};

function Riddle({riddle, date}: Props) {
    return (
        <div>
            <div className={'date'}>{date}</div>
            <div className={'block'}>
                <div className={'text'}>{riddle}</div>
            </div>
        </div>
    );
}

export default Riddle;
