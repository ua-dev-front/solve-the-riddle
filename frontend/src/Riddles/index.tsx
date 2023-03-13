import Riddle from '../Riddle';
import './styles.css';

export type Props = {
    riddles: any[]
};

function Riddles(riddles: Props) {
    return (
        <div className="riddles">
            {Object.values(riddles)[0].map((riddle) => (<Riddle riddle={riddle['riddle']} id={riddle['id']}
                                              creationDate={riddle['creationDate']} key={riddle['id']} />))}
        </div>
    );
}

export default Riddles;
