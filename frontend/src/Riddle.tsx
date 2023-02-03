import './riddles.css';

export type Props = {riddle: string};

function Riddle({riddle}: Props) {
    return (
        <div className='block'>
            <div className='riddle'>{riddle}</div>
        </div>
    );
}

export default Riddle;
