import Riddle from '../Riddle';
import './styles.css';

export type Props = {
    riddles: {
        riddle: string,
        id: number,
        creationDate: Date
    }[]
};

function Riddles({riddles}: Props) {
    return (
        <div className="riddles">
            {riddles.map(({riddle, id, creationDate}) => (<Riddle riddle={riddle} id={id}
                                              creationDate={creationDate} key={id} />))}
        </div>
    );
}

export default Riddles;
