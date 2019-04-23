import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

function entries(state = {}, action) {
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
            console.log("ADD_CARD: action.entry=", action.entry)
            console.log("ADD_CARD: action.entry.newCard.name=", action.entry.newCard.name)
            console.log("ADD_CARD: action.entry.newCard.cards.question=", action.entry.newCard.cards.question)
            console.log("ADD_CARD: action.entry.newCard.cards.answer=", action.entry.newCard.cards.answer)

            return {
                ...state,
                ...state[action.entry.newCard.name],
                ...action.entry.newCard.cards
                }
        default:
            return state
    }
}

export default entries