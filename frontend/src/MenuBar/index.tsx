import { ReactNode } from 'react';
import './styles.scss';

interface MenuBarProps {
    signInButton: ReactNode;
}

function MenuBar({ signInButton }: MenuBarProps) {
    return (
        <div className="menuBar">
            <div className="menuBar_extremeBorder"></div>
            <div className="menuBar_viewRiddles">View Riddles</div>
            <div className="menuBar_centerBorder"></div>
            <div className="menuBar_signInButton">{signInButton}</div>
            <div className="menuBar_extremeBorder"></div>
        </div>
    );
}

export default MenuBar;
