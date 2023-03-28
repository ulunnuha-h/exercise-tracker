import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { server } from '../config/axios'

const useGetExercises = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState('')
    const [error, setError] = useState('')
    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
        server
            .get('/api/exercise', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setData(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { loading, data, error }
}

const useGetExerciseById = (id) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState('')
    const [error, setError] = useState('')
    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
        server
            .get(`/api/exercise/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setData(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { loading, data, error }
}

const useAddExercise = () => {
    const [loading, setLoading] = useState(false)
    const token = useSelector((state) => state.auth.token)

    const addExercise = async (data) => {
        setLoading(true)
        return server
            .post('/api/exercise/add', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .finally(() => setLoading(false))
    }

    return { addExercise, loading }
}

const useUpdateExercise = () => {
    const [loading, setLoading] = useState(false)
    const token = useSelector((state) => state.auth.token)

    const updateExercise = async (id, data) => {
        setLoading(true)
        return server
            .put(`/api/exercise/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .finally(() => setLoading(false))
    }

    return { updateExercise, loading }
}

const useDeleteExercise = () => {
    const [loading, setLoading] = useState(false)
    const token = useSelector((state) => state.auth.token)

    const deleteExercise = async (id) => {
        setLoading(true)
        return server
            .delete(`/api/exercise/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .finally(() => setLoading(false))
    }

    return { deleteExercise, loading }
}

export {
    useGetExercises,
    useGetExerciseById,
    useAddExercise,
    useDeleteExercise,
    useUpdateExercise,
}
