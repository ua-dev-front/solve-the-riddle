import MenuBar from './MenuBar';
import Riddles from './Riddles';
import SignInButton from './SignInButton';
import './App.css';

function App() {
    return (
        <div className="app">
            <MenuBar />
            <Riddles />
            <SignInButton />
        </div>
    );
}

export default App;
