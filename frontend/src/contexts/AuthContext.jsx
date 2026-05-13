import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const existingToken = localStorage.getItem('token')
    const existingUser = JSON.parse(localStorage.getItem('user')) || null

    const [token, setToken] = useState(existingToken)
    const [user, setUser] = useState(existingUser)

    const loginSession = (newToken, userData) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))
        setToken(newToken)
        setUser(userData)
    }

    const logoutSession = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    const value = {
        token,
        user,
        loginSession,
        logoutSession,
        isAuthenticated: !!token
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}