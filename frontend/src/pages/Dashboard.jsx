import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { getDashboardKpi } from "../services/salesService"

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
        <div>
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

            <div>
                <Link to="/sales">
                    <button>Sales Page</button>
                </Link>
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}