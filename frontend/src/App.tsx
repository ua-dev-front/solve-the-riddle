import React from 'react';
import MenuBar from './MenuBar';
import Riddles from './Riddles';
import SignInButton from './SignInButton';
import './App.css';

function App() {
    return (
        <div className="app">
            <MenuBar signInButton={<SignInButton />} />
            <Riddles />
        </div>
    );
}

export default App;
