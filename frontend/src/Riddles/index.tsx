import Riddle from '../Riddle';
import './styles.css';

export type Props = {
    riddles: Record<string, any>[]
};

function Riddles(riddles: Props) {
    return (
        <div className="riddles">
            {Object.values(riddles)[0].map(({riddle, id, creationDate}) => (<Riddle riddle={riddle} id={id}
                                              creationDate={creationDate} key={id} />))}
        </div>
    );
}

export default Riddles;
