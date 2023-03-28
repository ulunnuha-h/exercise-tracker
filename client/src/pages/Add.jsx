import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAddExercise } from '../data/exercise'

export const Add = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        title: '',
        description: '',
        duration: 0,
        date: '',
        username: 'Hanif',
    })
    const [error, setError] = useState('')
    const { title, description, duration, date } = data
    const { addExercise, loading } = useAddExercise()

    const dataHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        addExercise(data)
            .then(() => navigate('/'))
            .catch(({ data }) => setError(data.message))
    }

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
                ></textarea>
            </div>
            <div className="col-span-2 h-fit bg-gray-100 flex flex-col p-5 gap-3 rounded-lg">
                <button className="btn-primary" disabled={loading}>
                    {loading ? 'Loading' : 'Save'}
                </button>
                <Link className="btn-primary" to="/">
                    Back to Home
                </Link>
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
