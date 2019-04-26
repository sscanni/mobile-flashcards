import { AsyncStorage } from 'react-native'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'
import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './decks'

export function fetchCalendarResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}

export function submitEntry(entry, deckName ) {
    console.log("submitEntry: entry: ", entry)
    console.log("submitEntry: deckName: ", deckName)
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [deckName]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}