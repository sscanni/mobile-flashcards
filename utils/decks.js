// utils/decks.js

import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'MyFlashCards:decks'

const decks = {
    "Deck #1": {
        name: "Deck #1",
        cards: [
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
        ]
    },
    "Deck #2": {
        name: "Deck #2",
        cards: [
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
        ]
    },
    "Deck #3": {
        name: "Deck #3",
        cards: [
            { question: "xxxxxx", answer: "xxxxxxxx" },
        ]
    },
    "Deck #4": {
        name: "Deck #4",
        cards: [
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
        ]
    },
    "Deck #5": {
        name: "Deck #5",
        cards: [
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
            { question: "xxxxxx", answer: "xxxxxxxx" },
        ]
    },
}

export function formatDeck(name) {

    deck = {
        name: name,
        cards: []
    }
    return deck
}
export function formatCard(deckName, question, answer) {

    return {name: deckName,
            cards: { question: question, answer: answer }} 
}

export function delDeck(entryId, entries) {

    delete entries[entryId]
    
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(entries))

    return entries
}

function setDummyData() {

    // AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    // return decks
    return null
}

export function formatDeckResults(results) {
    //console.log("formatDeckResults: results=", results)
    return results === null
        ? setDummyData()
        : JSON.parse(results)
}

