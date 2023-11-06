import * as actions from '../actions/actionTypes'

const initialState = {
    loading: false,
    tickets: []
}

const isFetchingTicketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TICKETS_FETCH_START:
            return {
                ...state,
                loading: true
            }
        case actions.TICKETS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                tickets: (action.tickets).map(obj=> ({ ...obj, isSelected : 'false' }))//TODO:
            }
        case actions.TICKETS_FETCH_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default isFetchingTicketsReducer
