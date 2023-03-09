import Riddle from './Riddle';
import MenuBar from './MenuBar';
import './App.css'

function App() {
  return (
      <div className="container">
          <MenuBar />
          <div className="riddle">
              <Riddle id={1} creationDate={'15.11.2023'} riddle={'What has to be broken before you can use it?'} />
              <Riddle id={2} creationDate={'14.11.2023'} riddle={'I follow you all the time and copy your ' +
                  'every move, but you can’t touch me or catch me. What am I?'} />
          </div>
      </div>
  );
}

export default App;
