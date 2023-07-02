import {useEffect, useState} from "react";
import Riddle from '../Riddle';
import './styles.css';

const localURL = 'http://127.0.0.1:5000/';

function Riddles() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch(localURL);
            let actualData = await response.json();
            setData(actualData['riddles']);
        }
        getData();
    }, []);

    return (
        <div className="riddles">
            {data.map((riddle) => (<Riddle riddle={riddle['riddle']} id={riddle['id']} key={riddle['id']}
                                           creationDate={riddle['creationDate']}/>))}
        </div>
    );
}

export default Riddles;
