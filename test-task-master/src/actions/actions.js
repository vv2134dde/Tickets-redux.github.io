import * as actionTypes from './actionTypes'
import jsonData from '../tickets.json'
import currencyData from '../currency.json'

export const fetchStart = () => ({
    type: actionTypes.TICKETS_FETCH_START
})
export const fetchSuccess = tickets => ({
    type: actionTypes.TICKETS_FETCH_SUCCESS,
    tickets
})
export const fetchFail = error => ({
    type: actionTypes.TICKETS_FETCH_FAIL,
    error
})

export const fetchTickets = () => async dispatch => {
    dispatch(fetchStart())
    const toFakeData = () =>
        new Promise(resolve => {
            setTimeout(() => resolve(jsonData.tickets), 2000)
        })

    try {
        const response = await toFakeData()
        dispatch(fetchSuccess(response))
    } catch (err) {
        dispatch(fetchFail(err))
    }
}

export const fetchCurrencyStart = () => ({
    type: actionTypes.RATES_FETCH_START
})
export const fetchCurrencySuccess = (rates, base) => ({
    type: actionTypes.RATES_FETCH_SUCCESS,
    rates,
    base
})
export const fetchCurrencyFail = error => ({
    type: actionTypes.RATES_FETCH_FAIL,
    error
})

export const fetchCurrencyData = () => async dispatch => {
    dispatch(fetchCurrencyStart())
    const toGetData = () =>
        new Promise(resolve => {
            resolve(currencyData)
        })
    try {
        const response = await toGetData()
        dispatch(fetchCurrencySuccess(response.rates, response.base))
    } catch (err) {
        dispatch(fetchCurrencyFail(err))
    }
}

export const selectCurrency = (event, currentCurrency) => ({
    type: actionTypes.RATES_CHANGE_RATE,
    currentCurrency,
    event
})

// export const filterTickets = (event) => ({
//     type: actionTypes.TICKETS_FILTER_BY_STOPS,
//     event
// }) //TODO: change filter based on redux
