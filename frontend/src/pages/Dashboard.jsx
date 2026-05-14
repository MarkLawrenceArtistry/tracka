import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { getDashboardKpi } from "../services/salesService"

import logo from '../assets/logo.png';

export default function Dashboard() {
    const { logoutSession, user } = useAuth()
    const [kpi, setKpi] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getDashboardKpi()
                if(result) {
                    setKpi(result.data)
                }
            } catch(err) {
                console.error(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleLogout = () => {
        logoutSession()
        navigate('/login')
    }

    if(loading) return <p>Loading...</p>
    console.log(kpi)

    return (
        <div className="dashboard-div">
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
                <h1>Dashboard</h1>

                <div style={{ display: 'flex', gap: "20px", marginTop: '20px' }}>

                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <h3>Total Sales</h3>
                        <p>{kpi.totalSales["SUM(amount)"]}</p>
                    </div>

                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <h3>Average Sale</h3>
                        <p>{kpi.totalAvgSales['AVG(amount)']}</p>
                    </div>

                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <h3>This Month</h3>
                        <p>{kpi.totalSalesThisMonth.total ? kpi.totalSalesThisMonth.total : 0}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}