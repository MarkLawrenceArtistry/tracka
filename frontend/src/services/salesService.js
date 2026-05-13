import api from './api'

export const createSale = async (data, user_id) => {
    const response = await api.post(`/sales/${user_id}`, data)
    return response.data
}

export const updateSale = async (data, sale_id) => {
    const response = await api.put(`/sales/${sale_id}`, data)
    return response.data
}

export const getAllSales = async (user_id) => {
    const response = await api.get(`/sales/${user_id}`)
    return response.data
}

// tangina ang gulo ng api architecture ko rito
export const deleteSale = async (sale_id) => {
    const response = await api.delete(`/sales/${sale_id}`)
    return response.data
}

export const getDashboardKpi = async () => {
    const response = await api.get(`/sales/dashboard/kpi`)
    return response.data
}
