import api from './api'

export const getAllUsers = async () => {
    const response = await api.get('/users/')
    return response.data
}

export const login = async (credentials) => {
    const response = await api.post('/users/login', credentials)
    return response.data
}

export const register = async (credentials) => {
    const response = await api.post('/users/register', credentials)
    return response.data
}

export const checkSession = async () => {
    const response = await api.post('/users/me')
    return response.data
}