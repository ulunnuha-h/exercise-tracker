import { ExercisesCard, ExercisesLoading } from '../components/Exercise'
import { Link } from 'react-router-dom'
import { useGetExercises } from '../data/exercise'
import { setToken } from '../data/user'
import { useDispatch } from 'react-redux'

export const Home = () => {
    const { data, loading, error } = useGetExercises()
    const dispatch = useDispatch()
    if (error) return <main>{error}</main>

    return (
        <main className="grid grid-cols-12 gap-3 pb-5">
            <div className="col-span-12 md:col-span-10 grid lg:grid-cols-4 grid-cols-2 gap-3 order-last md:order-first">
                {loading ? <ExercisesLoading /> : <ExercisesCard data={data} />}
            </div>
            <div className="col-span-12 md:col-span-2 h-fit bg-gray-100 flex flex-col p-5 gap-3 rounded-lg">
                <Link className="btn-primary" to="/add">
                    Add Exercise
                </Link>
                <button
                    className="btn-primary"
                    onClick={() => dispatch(setToken(''))}
                >
                    Log Out
                </button>
            </div>
        </main>
    )
}
