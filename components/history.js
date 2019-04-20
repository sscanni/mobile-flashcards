import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
//import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors'
import DateHeader from './dateheader'
import MetricCard from './metriccard'
import { AppLoading } from 'expo'

import TextButton from "./textbutton";

class History extends Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(() => this.setState(() => ({ ready: true })))
    }
    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <TouchableOpacity
                    onPress={() => console.log('Pressed!')}
                >
                    <MetricCard date={formattedDate} metrics={metrics} />
                </TouchableOpacity>}
        </View>
    )
    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
        </Text>
            </View>
        )
    }

    decks = {
        "Deck #1": { 
            name: "Deck #1", 
            cards: [
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
            ] 
        },
        "Deck #2": { 
            name: "Deck #2", 
            cards: [
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
            ] 
        },
        "Deck #3": { 
            name: "Deck #3", 
            cards: [
                {question: "xxxxxx", answer: "xxxxxxxx"},
            ] 
        },
        "Deck #4": { 
            name: "Deck #4", 
            cards: [
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
            ] 
        },
        "Deck #5": { 
            name: "Deck #5", 
            cards: [
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
                {question: "xxxxxx", answer: "xxxxxxxx"},
            ] 
        },
    }
    render() {

        const deckKeys = Object.keys(this.decks)

        const { entries } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        const deckList = deckKeys.map((key) => {
            return (
                <View key={key}>
                    <TextButton style={{ fontSize: 24 }} onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        {entryId: key}
                    )}>
                    {this.decks[key].name}    
                    </TextButton>     
                    <Text style={{ textAlign: 'center' }}>{this.decks[key].cards.length} cards</Text>                    
                </View>
            )
        })

        return (
            <ScrollView>
                <View>
                    {deckList}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 30,
        marginRight: 30
    },
    // main: {
    //         flexDirection: 'column',
    //         marginTop: 12
    //     },
    container: {
        flex: 1,
    }
})


function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(
    mapStateToProps,
)(History)