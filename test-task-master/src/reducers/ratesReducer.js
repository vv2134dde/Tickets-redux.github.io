import * as actions from '../actions/actionTypes'
import supportedCurrency from '../constants/supportedCurrency'

const initialState = {
    loadingRates: false,
    rates: {},
    base: supportedCurrency[0],
    currentCurrency: supportedCurrency[0]
}

const ratesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.RATES_FETCH_START:
            return {
                ...state,
                loadingRates: true
            }
        case actions.RATES_FETCH_SUCCESS:
            return {
                ...state,
                loadingRates: false,
                rates: action.rates,
                base: action.base
            }
        case actions.RATES_FETCH_FAIL:
            return {
                ...state,
                loadingRates: false
            }
        case actions.RATES_CHANGE_RATE:
            return {
                ...state,
                currentCurrency: action.event
            }
        default:
            return state
    }
}

export default ratesReducer
