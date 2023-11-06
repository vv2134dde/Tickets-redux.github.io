import { combineReducers } from 'redux'
import isFetchingTicketsReducer from './isFetchingTicketsReducer'
import ratesReducer from './ratesReducer'

export default combineReducers({
    tickets: isFetchingTicketsReducer,
    rates: ratesReducer
})
