import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

function entries(state = {}, action) {
    console.log("reducer: action.entry=", action.entry)
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries,
            }
        case ADD_ENTRY:
            return {
                ...state,
                ...action.entry
            }
        case ADD_CARD:
            return {
                ...state,
                [action.entry.entry.name] : {
                name: action.entry.entry.name,
                cards: state[action.entry.entry.name].cards.concat([action.entry.entry.cards])
                }
            }
        default:
            return state
    }
}

export default entries