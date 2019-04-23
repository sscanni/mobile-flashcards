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

// export default function getDecks() {
//     console.log("return decks")
//     return decks
// }

// export function addDeck(name) {

//     // console.log("addDeck key=", name);

//     deck =
//         {
//             name: name,
//             cards: []
//         }

//     decks = {
//         ...decks, [name]: deck
//     }

//     return deck

//     console.log("addDeck decks=", decks);

//     // keys = Object.keys(decks)
//     // keys.map((key) => {
//     //     console.log("addDeck name=", decks[key].name);
//     //     console.log("addDeck name=", decks[key].cards.length);
//     // })

// }
export function delDeck(name) {
    delete decks[name]
}

// export function addCard (key, question, answer) {

//     const newCard = {"quesion": question, "answer": answer}

//     decks[key].cards = [
//         ...decks[key].cards,
//         newCard
//     ]

//     // decks[key].cards.map((card) => {
//     //     console.log("addDeck card=", card);
//     // })
// }

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
        : results
}

export function formatCard(entryId, question, answer) {

    return {name: entryId,
            cards: { question: question, answer: answer }} 
}