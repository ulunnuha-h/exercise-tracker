import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setToken } from './data/user'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToken(localStorage.getItem('token') || ''))
    }, [])

    return (
        <main className="bg-sky-500 min-h-screen">
            <div className="container mx-auto">
                <Navbar />
                <Outlet />
            </div>
        </main>
    )
}

export default App
