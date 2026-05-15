import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

import logo from '../assets/logo.png';

export default function Register() {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await register(credentials)
            const { token, data } = response
            console.log(response)

            alert("Register successful")
            navigate('/login')
        } catch(err) {
            alert('Error')
            console.error(err.message)
        }
    }

    return (
        <div className="register-div">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-form-children">
                    <div className="register-form-header">
                        <img src={logo} className="logo" />
                        <h1>Register</h1>
                        <p>Create your account.</p>
                    </div>
                    <div className="register-form-body">
                        <input type="text" placeholder="Name..." value={credentials.name} onChange={(e) => setCredentials({...credentials, name: e.target.value})} required />
                        <input type="text" placeholder="Email.." value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
                        <input type="password" placeholder="Password.." value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
                    </div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}