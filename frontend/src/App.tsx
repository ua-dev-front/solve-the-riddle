import Riddle from './Riddle';

function App() {
  return (
      <div className='container'>
          <div className={"line-container"}>
              <div className={"line1"}></div>
              <div className={"line2"}>View Riddles</div>
              <div className={"line3"}></div>
          </div>
          <div className={'riddle'}>
              <Riddle date={'#2, 15.11.2023'} riddle={'What has to be broken before you can use it?'} />
              <Riddle date={'#1, 14.11.2023'} riddle={'I follow you all the time and copy your every move, ' +
                  'but you can’t touch me or catch me. What am I?'} />
          </div>
      </div>
  );
}

export default App;
