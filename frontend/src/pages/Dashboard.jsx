import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { getDashboardKpi } from "../services/salesService"

import logo from '../assets/logo.png';
import dashboard from '../assets/dashboard.png';
import sales from '../assets/sales.png';

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
                    <Link to="/dashboard">
                        <div className="nav-item">
                            <img src={dashboard} className="" />
                            <li>Dashboard</li>
                        </div>
                    </Link>
                    <Link to="/sales">
                        <div className="nav-item">
                            <img src={sales} className="" />
                            <li>Sales</li>
                        </div>
                    </Link>
                </div>
                <div className="sidebar-footer">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="content">
                <div className="content-header">
                    <h1>Dashboard</h1>
                </div>

                <div className="content-body">
                    <div className="kpi-wrapper">
                        <div className="kpi-card">
                            <p>Total Sales</p>
                            <h3>₱{kpi.totalSales["SUM(amount)"] === null ? 0 : kpi.totalSales["SUM(amount)"].toLocaleString('en-US')}</h3>
                            <p className="kpi-card-description">Total number of sales.</p>
                        </div>

                        <div className="kpi-card">
                            <p>Average Sale</p>
                            <h3>₱{kpi.totalAvgSales === null ? 0 : kpi.totalAvgSales.toLocaleString('en-US')}</h3>
                            <p className="kpi-card-description">Total average of all sales.</p>
                        </div>

                        <div className="kpi-card">
                            <p>This Month</p>
                            
                            <h3>₱{kpi.totalSalesThisMonth.total === null ? 0 : kpi.totalSalesThisMonth.total.toLocaleString('en-US')}</h3>
                            <p className="kpi-card-description">Total number of sales done by this month.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}