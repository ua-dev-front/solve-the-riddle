import {useState} from "react";
import MenuBar from './MenuBar';
import Riddles from './Riddles';
import Input from './Input';
import ExpanderButton from './ExpanderButton';
import AnswerIndicator, {IndicatorType} from './AnswerIndicator';
import './App.css';

function App() {
    const [answer, setAnswer] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [indicatorType, setIndicatorType] = useState(IndicatorType.Button);

    const buttonText = isExpanded ? 'ah, forget it!' : 'take a guess';

    async function verify() {
        console.log('clicked');
    }

    function toggleIndicatorType() {
        setIndicatorType((type) => {
            return type === IndicatorType.Button
                ? IndicatorType.Preloader
                : IndicatorType.Button;
        });
    }

    return (
      <div className="app">
          <MenuBar />
          <Riddles riddles = {[{'riddle': 'What has to be broken before you can use it?', 'id': 1,
              'creationDate': new Date(2023, 11, 15)},
          {'riddle': 'I follow you all the time and copy your every move, but you can’t touch me or catch me. ' +
                  'What am I?', 'id': 2, 'creationDate': new Date(2023, 11, 14)}]}/>
          <Input value={answer} onChange = {(newAnswer) => setAnswer(newAnswer)} />
          <ExpanderButton text = {buttonText} isExpanded={isExpanded}
                          onClick = {(isExpanded) => setIsExpanded(isExpanded)} />
          <AnswerIndicator
              indicator={indicatorType}
              onClick={verify}
              disabled={false}
          />
          <button onClick={toggleIndicatorType}>Change indicator</button>

      </div>
  );
}

export default App;
