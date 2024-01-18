import Close from './Close.svg';
import './styles.css';

interface Props {
    onClick?: () => void;
}

function SignInForm({onClick}: Props) {
     return (
        <div className="signInForm">
            <button className="signInForm_close-button" onClick={onClick}>
                <img src={Close} alt="Close" className="close-image" />
            </button>
            <div className="signInForm_login-form">
                <div className="signInForm_login">
                    Логін: <input />
                </div>
                <div className="signInForm_password">
                    Пароль: <input />
                </div>
                <button className="signInForm_sign-button">Увійти</button>
                <button className="signInForm_register-button">Зареєструватися</button>
            </div>
        </div>
    );
}

export default SignInForm;
