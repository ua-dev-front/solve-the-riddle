import './styles.css';

export type Props = {
    riddle: string;
    id: number;
    creationDate: Date;
};

function Riddle({riddle, id, creationDate}: Props) {
    return (
        <div>
            <div className="riddle_date">#{id}, {creationDate.toLocaleDateString()}</div>
            <div className="riddle_block">
                <div className="riddle_text">{riddle}</div>
            </div>
        </div>
    );
}

export default Riddle;
