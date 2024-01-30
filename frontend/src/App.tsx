import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import Riddles from './Riddles';
import SignInButton from './SignInButton';
import SignInForm from './SignInForm';
import './App.css';

function App() {
    const [isSignInFormVisible, setIsSignInFormVisible] = useState(false);

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.keyCode === 27 && isSignInFormVisible) {
                setIsSignInFormVisible(false);
            }
        }
        document.addEventListener('keydown', handleKeyPress);
    }, [isSignInFormVisible]);

    function toggleForm() {
        setIsSignInFormVisible(!isSignInFormVisible);
    }

    return (
        <div className="app">
            <div className={`app-mainWindow${isSignInFormVisible ? '-unavailable' : ''}`}>
                <div className={`app-mainWindow-overlay${isSignInFormVisible ? '-active' : ''}`}></div>
                <MenuBar signInButton={<SignInButton onClick={toggleForm} />} />
                <Riddles />
            </div>
            <div className={`app-signInForm${isSignInFormVisible ? '-visible' : ''}`}>
                <SignInForm onClick={toggleForm} />
            </div>
        </div>
    );
}

export default App;
