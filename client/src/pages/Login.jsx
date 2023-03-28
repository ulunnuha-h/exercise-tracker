import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { setToken, useLogin } from '../data/user'

export const Login = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = data
    const { login, loading } = useLogin()
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const dataHandler = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setError('')
        login(data)
            .then(({ data }) => {
                console.log(data)
                dispatch(setToken(data.token))
            })
            .catch(() => {
                setError('Email atau Password salah')
            })
    }

    if (token) return <Navigate to="/" replace />

    return (
        <main className="h-[80vh] flex items-center justify-center">
            <form
                className="bg-gray-100 px-5 pt-9 rounded-lg lg:w-1/3 w-full"
                onSubmit={submitHandler}
            >
                <h1 className="mb-5">Login</h1>
                {error ? (
                    <section className="bg-red-500 py-2 px-4 mb-5 text-white rounded-md">
                        {error}
                    </section>
                ) : null}
                <section className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-300 rounded-md p-2 mb-2"
                        required
                        value={email}
                        onChange={dataHandler}
                    ></input>
                </section>
                <section className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-300 rounded-md p-2 mb-2"
                        required
                        value={password}
                        onChange={dataHandler}
                    ></input>
                </section>
                <button className="btn-primary w-full mt-3">
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <section className="text-center mt-4 pb-4">
                    Tidak punya akun? silakan{' '}
                    <Link to="/register" className="underline text-lime-500">
                        Register
                    </Link>
                </section>
            </form>
        </main>
    )
}
