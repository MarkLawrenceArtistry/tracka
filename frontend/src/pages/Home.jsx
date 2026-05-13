import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }

    return (
        <div>
            <h1>Welcome</h1>

            <p>Press the button to login</p>
            <button onClick={handleClick}>Sign In</button>
        </div>
    )
}