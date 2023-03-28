import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './data/counter'
import userReducer from './data/user'

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: userReducer,
    },
})
