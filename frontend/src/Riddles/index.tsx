import { useEffect, useState } from "react";
import Riddle, {RiddleProps} from '../Riddle';
import Preloader from './Preloader.svg';
import './styles.css';

function Riddles() {
    const [data, setData] = useState<RiddleProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${process.env.REACT_APP_UNSPLASH_KEY}`);
            const actualData = await response.json();
            setData(actualData['riddles']);
            setLoading(false);
        }
        getData();
    }, []);

    return (
        <div className="riddles">
            {loading ? (
                <div className="riddles_preloader">
                    <img src={Preloader} alt="Loading..." />
                </div>
            ) : (
                data !== null &&
                data.map(({ riddle, id, creationDate }: RiddleProps) => (
                    <Riddle
                        riddle={riddle}
                        id={id}
                        key={id}
                        creationDate={creationDate}
                    />
                ))
            )}
        </div>
    );
}

export default Riddles;
