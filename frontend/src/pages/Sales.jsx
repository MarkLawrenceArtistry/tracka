import { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { createSale, deleteSale, getAllSales } from '../services/salesService'

export default function Sales() {
    const { logoutSession, user } = useAuth()
    const navigate = useNavigate()

    const [salesList, setSalesList] = useState([])
    const [sale, setSale] = useState({user_id: '', amount: '', description: '', date: ''})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSales()
        console.log(user)
    }, [])

    async function fetchSales() {
        try {
            const result = await getAllSales(user.id)

            if(result) {
                setSalesList(Array.isArray(result.data) ? result.data : [])
            }

            console.log(result)
        } catch(err) {
            console.error(`Error fetching sales: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const newSaleData = {
                user_id: user.id,
                amount: sale.amount,
                description: sale.description,
                date: sale.date
            }

            const response = await createSale(newSaleData)

            if(response.success) {
                alert("Sale created successfully")

                setSale(newSaleData)
                fetchSales()
            }
        } catch(err) {
            console.error(`Error creating sale: ${err.message}`)
            alert(`Failed to create sale!`)
        }
    }

    const handleLogout = () => {
        logoutSession()
        navigate('/login')
    }

    const handleDelete = async (sale_id) => {
        // prerequisites para makapag delete ng sale
        // 1. sale_id = req.params
        // 2. user_id = req.user.id

        try {
            const result = await deleteSale(sale_id)

            if(result) {
                alert('Sale deleted successfully.')
            }
        } catch(err) {
            console.error(`Error deleting sale: ${err.message}`)
        } finally {
            fetchSales()
        }
    }
    
    const handleUpdate = async (sale_id) => {
        
    }

    if(loading) return <p>Loading sales data...</p>

    return (
        <div>
            <h1>Manage Sales</h1>

            <form onSubmit={handleSubmit}>
                <h3>Add New Sale</h3>

                <div>
                    <label>Amount: </label> <br />
                    <input
                        type="number"
                        min={1}
                        placeholder="e.g. 150"
                        value={sale.amount}
                        onChange={(e) => setSale({...sale, amount: e.target.value})}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Description: </label> <br />
                    <input
                        type="text"
                        placeholder="e.g. Sold a laptop"
                        value={sale.description}
                        onChange={(e) => setSale({...sale, description: e.target.value})}
                        required
                    />
                </div>

                <br />
                
                <div>
                    <label>Date: </label> <br />
                    <input
                        type="text"
                        placeholder="e.g. 5/14/2026"
                        value={sale.date}
                        onChange={(e) => setSale({...sale, date: e.target.value})}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            <hr />

            <h3>Sales History</h3>
            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salesList.length === 0 ? (
                        <tr colSpan="4" style={{ textAlign: 'center' }}>
                            <td>No sales found. Add one above!</td>
                        </tr>
                    ) : (
                        salesList.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{sale.amount}</td>
                                <td>{sale.description}</td>
                                <td>{sale.date}</td>
                                <td>
                                    <button onClick={() => handleUpdate(sale.id)}>Update</button>
                                    <button onClick={() => handleDelete(sale.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}