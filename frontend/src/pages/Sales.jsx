import { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link, useAsyncError } from 'react-router-dom'
import { createSale, getSale, updateSale, deleteSale, getAllSales } from '../services/salesService'

import logo from '../assets/logo.png';

export default function Sales() {
    const { logoutSession, user } = useAuth()
    const navigate = useNavigate()

    const [salesList, setSalesList] = useState([])
    const [sale, setSale] = useState({user_id: '', amount: '', description: '', date: ''})
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("Add New Sale")
    const [currentSaleID, setCurrentSaleID] = useState(null)

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
            const saleData = {
                user_id: user.id,
                amount: sale.amount,
                description: sale.description,
                date: sale.date
            }

            if(!currentSaleID) {
                const response = await createSale(saleData)

                if(response.success) {
                    alert("Sale created successfully")

                    setSale({user_id: '', amount: '', description: '', date: ''})
                    fetchSales()
                }
            } else {
                const response = await updateSale(saleData, currentSaleID)

                if(response.success) {
                    alert("Sale updated successfully")

                    setCurrentSaleID(null)
                    setTitle("Add New Sale")
                    setSale({user_id: '', amount: '', description: '', date: ''})
                    fetchSales()
                }
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
        try {
            // 1. kunin yung existing sale
            // 2. ilapat yung existing sale sa fields ng form
            // 3. update yung title ng form
            // 4. update yung state kung "editing" state, IF OO ang sale service function call `updateSale()` if not `createSale()`

            const saleResponse = await getSale(sale_id)
            setSale({amount: saleResponse.data.amount, description: saleResponse.data.description, date: saleResponse.data.date})
            setCurrentSaleID(sale_id)
            setTitle("Update Sale")

        } catch(err) {
            console.error(`Error updating sale: ${err.message}`)
            alert(`Failed to update sale!`)
        }
    }

    if(loading) return <p>Loading sales data...</p>

    return (
        <div className="sales-div">
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src={logo} className="logo" />
                    <h1>Tracka</h1>
                </div>
                <div className="sidebar-nav">
                    <Link to="/sales">
                        <li className="nav-item">Sales</li>
                    </Link>
                    <Link to="/dashboard">
                        <li className="nav-item">Dashboard</li>
                    </Link>
                </div>
                <div className="sidebar-footer">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="content">
                <h1>Manage Sales</h1>

                <form onSubmit={handleSubmit}>
                    <h3>{title}</h3>

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
        </div>
    )
}