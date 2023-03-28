import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useRegister } from '../data/user'

export const Register = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const { email, password, username } = data
    const { register, loading } = useRegister()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

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
        if (password === confirmPassword) {
            register(data)
                .then(() => {
                    alert('New Account registered succesfully')
                    navigate('/login')
                })
                .catch(({ response }) => setError(response))
        } else setError("Confirm password doesn't match")
    }

    if (token) return <Navigate to="/" replace />

    return (
        <main className="h-[80vh] flex items-center justify-center">
            <form
                className="bg-gray-100 px-5 pt-9 rounded-lg lg:w-1/3 w-full"
                onSubmit={submitHandler}
            >
                <h1 className="mb-5">Register</h1>
                {error ? (
                    <section className="bg-red-500 py-2 px-4 mb-5 text-white rounded-md">
                        {error}
                    </section>
                ) : null}
                <section className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-300 rounded-md p-2 mb-2"
                        required
                        value={username}
                        onChange={dataHandler}
                    ></input>
                </section>
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
                <section className="flex flex-col">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input
                        type="text"
                        name="confirm"
                        id="confirm"
                        className="bg-gray-300 rounded-md p-2 mb-2"
                        required
                        value={confirmPassword}
                        onChange={confirmPasswordHandler}
                    ></input>
                </section>
                <button className="btn-primary w-full mt-3">
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <section className="text-center mt-4 pb-4">
                    Sudah punya? silakan{' '}
                    <Link to="/login" className="underline text-lime-500">
                        Login
                    </Link>
                </section>
            </form>
        </main>
    )
}
