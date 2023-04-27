import MenuBar from './MenuBar';
import Riddles from './Riddles';
import Button from './Button';
import Input from './Input';
import './App.css';

function App() {

    async function verify() {
        console.log('clicked');
    }

    return (
      <div className="app">
          <MenuBar />
          <Riddles riddles = {[{'riddle': 'What has to be broken before you can use it?', 'id': 1,
              'creationDate': new Date(2023, 11, 15)},
          {'riddle': 'I follow you all the time and copy your every move, but you can’t touch me or catch me. ' +
                  'What am I?', 'id': 2, 'creationDate': new Date(2023, 11, 14)}]}/>
          <Button onClick = {verify} disabled = {false} />
          <Input inputValue={"shadow"} onChange = {(value) => console.log(value)} />
      </div>
  );
}

export default App;
