import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }

    const handleClickRegister = () => {
        navigate('/register')
    }

    return (
        <div className="homepage-div">
            <div>
                <div className="header">
                    <h1>Welcome</h1>
                    <p>Press the button to login</p>
                </div>

                <div className="buttons">
                    <button onClick={handleClick}>Sign In</button>
                    <button onClick={handleClickRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}