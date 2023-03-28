import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const ExercisesCard = ({ data = [] }) => {
    return (
        <>
            {data.map((val, idx) => (
                <Link
                    className="bg-gray-100 hover:bg-gray-200 px-4 pb-16 rounded-lg relative overflow-hidden group cursor-pointer hover:scale-95 transition-all"
                    key={idx}
                    to={`/exercise/${val._id}`}
                >
                    <header className="py-2">
                        {new Date(val.date).toDateString()}
                    </header>
                    <hr className="border-gray-300"></hr>
                    <h2 className="mt-3 line-clamp-2">{val.title}</h2>
                    <span className="text-sm">{val.duration} Minutes</span>
                    <section className="absolute bottom-0 w-full left-0 px-4 py-2 h-1/5 transition-all border-t-[1px] border-gray-300 overflow-hidden whitespace-nowrap text-ellipsis">
                        {val.description}
                    </section>
                </Link>
            ))}
        </>
    )
}

ExercisesCard.propTypes = {
    data: PropTypes.array,
}
