// utils/decks.js

import { AsyncStorage } from 'react-native'

export const CALENDAR_STORAGE_KEY = 'MyFlashCards:decks'

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

// export function formatCard (deckName, question, answer) {

//     const newCard = {"quesion": question, "answer": answer}

//     decks[deckName].cards = [
//         ...decks[deckName].cards,
//         newCard
//     ]
//     // decks[key].cards.map((card) => {
//     //     console.log("addDeck card=", card);
//     // })
// }
export function delDeck(entryId, entries) {

    console.log("delDeck entryId=", entryId)
    console.log("delDeck entries=", entries)

    delete entries[entryId]
    
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(entries))

    console.log("delDeck after delete: entries=", entries)

    return entries
}

function setDummyData() {

    //AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(decks))
    console.log("setDummyData: decks=", JSON.stringify(decks))
    return decks
}

export function formatCalendarResults(results) {
    console.log("formatCalendarResults: results=", results)
    return results === null
        ? setDummyData()
        : JSON.parse(results)
}

