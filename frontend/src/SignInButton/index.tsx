import './styles.scss';

interface Props {
    onClick?: () => void;
}

function SignInButton({onClick}: Props) {
    return (
        <button className="signInButton" onClick={onClick}>Sign in</button>
    );
}

export default SignInButton;
