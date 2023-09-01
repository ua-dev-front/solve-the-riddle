import { ReactNode } from 'react';
import './styles.css';

interface MenuBarProps {
    signInButton: ReactNode;
}

function MenuBar({ signInButton }: MenuBarProps) {
    return (
        <div className="menuBar">
            <div className="menuBar_leftBorder"></div>
            <div className="menuBar_centerBorder">View Riddles</div>
            <div className="menuBar_rightBorder">{signInButton}</div>
        </div>
    );
}

export default MenuBar;
