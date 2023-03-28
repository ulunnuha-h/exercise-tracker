import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
    const token = useSelector((state) => state.auth.token)

    if (token) return <Outlet />
    else return <Navigate to="/login" />
}
