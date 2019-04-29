import { AsyncStorage } from 'react-native'
import { formatDeckResults, FLASHCARDS_STORAGE_KEY } from './decks'

export function fetchDecks() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(formatDeckResults)
}

export function submitEntry(entry, deckName ) {
    console.log("submitEntry: entry: ", entry)
    console.log("submitEntry: deckName: ", deckName)
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deckName]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
}