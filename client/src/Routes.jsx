import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ProtectedRoutes } from './config/protectedRoutes'
import { Add, Home, Login } from './pages'
import { Detail } from './pages/Detail'
import { Register } from './pages/Register'

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '',
                        element: <Home />,
                    },
                    {
                        path: 'add',
                        element: <Add />,
                    },
                    {
                        path: 'exercise/:id',
                        element: <Detail />,
                    },
                ],
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: '*',
                element: <div>404 Not Found</div>,
            },
        ],
    },
])
