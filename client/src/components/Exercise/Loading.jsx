import React from 'react'

export const ExercisesLoading = () => {
    return (
        <>
            {[1, 2].map((idx) => (
                <div
                    className="bg-gray-100 hover:bg-gray-200 px-4 pb-16 rounded-lg relative overflow-hidden group cursor-pointer hover:scale-95 transition-all"
                    key={idx}
                >
                    <header className="py-2">
                        <div className="w-1/2 h-6 bg-gray-300 block animate-pulse rounded-sm"></div>
                    </header>
                    <hr className="border-gray-300"></hr>
                    <div className="w-full h-6 bg-gray-300 mt-4 animate-pulse"></div>
                    <div className="w-full h-6 bg-gray-300 mt-3 animate-pulse"></div>
                    <div className="w-1/3 h-3 bg-gray-300 my-2 animate-pulse"></div>
                    <section className="absolute bottom-0 w-full left-0 px-4 py-2 h-1/5 transition-all border-t-[1px] border-gray-300 overflow-hidden whitespace-nowrap text-ellipsis">
                        <div className="w-full h-5 bg-gray-300 animate-pulse"></div>
                    </section>
                </div>
            ))}
        </>
    )
}
