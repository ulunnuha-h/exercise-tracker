export const formateDate = (date) => {
    const newDate = new Date(date)

    return (
        newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        newDate.getDate().toString().padStart(2, '0')
    )
}
