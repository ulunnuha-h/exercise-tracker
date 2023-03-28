import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import {
    useDeleteExercise,
    useGetExerciseById,
    useUpdateExercise,
} from '../data/exercise'
import { formateDate } from '../utils/formatDate'

export const Detail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: initialData, loading: getLoading } = useGetExerciseById(id)
    const { updateExercise, loading: updateLoading } = useUpdateExercise()
    const { deleteExercise, loading: deleteLoading } = useDeleteExercise()
    const [data, setData] = useState({
        title: '',
        description: '',
        duration: 0,
        date: '',
        username: 'Hanif',
    })
    const { title, description, duration, date } = data
    const [error, setError] = useState('')

    const dataHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateExercise(id, data)
            .then(() => navigate('/'))
            .catch((err) => setError(err.message))
    }

    const deleteHandler = () => {
        deleteExercise(id)
            .then(() => navigate('/'))
            .catch((err) => setError(err.message))
    }

    useEffect(() => {
        setData({
            title: initialData.title || '',
            description: initialData.description || '',
            duration: initialData.duration || 0,
            date: formateDate(initialData.date) || '',
            username: initialData.username || 'Hanif',
        })
    }, [getLoading])

    if (getLoading)
        return (
            <main className="grid grid-cols-12">
                <div className="col-span-10 flex flex-col bg-gray-100 rounded-lg h-[50vh] p-5">
                    <section className="h-1/2 w-full bg-gray-300 animate-pulse rounded-md"></section>
                </div>
            </main>
        )

    return (
        <form className="grid grid-cols-12 gap-3 pb-5" onSubmit={submitHandler}>
            <div className="col-span-10 flex flex-col bg-gray-100 rounded-lg overflow-hidden">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={dataHandler}
                    value={title}
                    name="title"
                    className="text-6xl p-5 border-0 outline-0 bg-transparent"
                    required
                ></input>
                <hr></hr>
                <section className="flex p-5 gap-5">
                    <span className="flex flex-col">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={dataHandler}
                            value={date}
                            className="p-2 rounded-sm outline-gray-300"
                            required
                        ></input>
                    </span>
                    <span className="flex flex-col">
                        <label htmlFor="duration">Duration in Minutes</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            onChange={dataHandler}
                            value={duration}
                            className="p-2 rounded-sm outline-gray-300"
                            required
                        ></input>
                    </span>
                </section>
                <hr></hr>
                <textarea
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={dataHandler}
                    className="text-lg p-5 bg-transparent outline-0 min-h-[50vh]"
                    required
                >
                    {description}
                </textarea>
            </div>
            <div className="col-span-2 h-fit bg-gray-100 flex flex-col p-5 gap-3 rounded-lg">
                <button className="btn-primary" disabled={updateLoading}>
                    {updateLoading ? 'Loading' : 'Update'}
                </button>
                <Link className="btn-primary" to="/">
                    Back to Home
                </Link>
                <button
                    className="btn-secondary"
                    disabled={deleteLoading}
                    onClick={deleteHandler}
                >
                    {deleteLoading ? 'Loading' : 'Delete'}
                </button>
                {error ? (
                    <span className="bg-red-500 text-white py-3 pr-3 rounded-md flex items-center">
                        <Icon
                            icon="bi:exclamation-circle-fill"
                            className="w-12"
                        />
                        {error}
                    </span>
                ) : null}
            </div>
        </form>
    )
}
