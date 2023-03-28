import { createSlice } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { server } from '../config/axios'

const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setLoading(true)
        return server.post('/api/login', data).finally(() => setLoading(false))
    }

    return { login, loading }
}

const useRegister = () => {
    const [loading, setLoading] = useState(false)

    const register = async (data) => {
        setLoading(true)
        return server
            .post('/api/register', data)
            .finally(() => setLoading(false))
    }

    return { register, loading }
}

const useGetProfile = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { userToken } = useToken()

    useEffect(() => {
        server
            .get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then(({ data }) => setData(data))
            .catch(({ response }) => setError(response))
            .finally(() => setLoading(setLoading(false)))
        console.log('tokenchanged')
    }, [userToken])

    return { data, loading, error }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        auth: false,
        token: '',
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
    },
})

export const { setAuth, setToken } = userSlice.actions
export { useLogin, useGetProfile, useRegister }
export default userSlice.reducer
