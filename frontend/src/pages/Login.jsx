import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(null)
    const { loginSession } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await login(credentials)
            const { token, data } = response
            loginSession(token, data)
            console.log(response)

            alert("Login successful")
            navigate('/dashboard')
        } catch(err) {
            alert('Invalid credentials')
            console.error(err.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label>Email: </label> <br />
                    <input type="text" placeholder="Email.." value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
                </div>
                <div>
                    <label>Password: </label> <br />
                    <input type="password" placeholder="Password.." value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}