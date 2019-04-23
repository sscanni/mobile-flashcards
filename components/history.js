import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading } from 'expo'
import { AsyncStorage } from 'react-native'

import TextButton from "./textbutton";

class History extends Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props

        AsyncStorage.clear();    //Temp line for testing

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            // .then(({ entries }) => {
            //     if (!entries[timeToString()]) {
            //         dispatch(addEntry({
            //             [timeToString()]: getDailyReminderValue()
            //         }))
            //     }
            // })
            .then(() => this.setState(() => ({ ready: true })))
    }
    // renderItem = ({ today, ...metrics }, formattedDate, key) => (
    //     <View style={styles.item}>
    //         {today
    //             ? <View>
    //                 <DateHeader date={formattedDate} />
    //                 <Text style={styles.noDataText}>
    //                     {today}
    //                 </Text>
    //             </View>
    //             : <TouchableOpacity
    //                 onPress={() => console.log('Pressed!')}
    //             >
    //                 <MetricCard date={formattedDate} metrics={metrics} />
    //             </TouchableOpacity>}
    //     </View>
    // )
    // renderEmptyDate(formattedDate) {
    //     return (
    //         <View style={styles.item}>
    //             <DateHeader date={formattedDate} />
    //             <Text style={styles.noDataText}>
    //                 You didn't log any data on this day.
    //     </Text>
    //         </View>
    //     )
    // }

    render() {

        debugger

        // const decks = getDecks()  // Now getting decks from async storage
        
        const { entries } = this.props
        const { ready } = this.state

        const deckKeys = Object.keys(entries)

        // console.log("entries=", entries)

        if (ready === false) {
            return <AppLoading />
        }
        if (deckKeys.length === 0) {
            return  (
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 24 }}>No Decks Found</Text> 
                </View>
            )
        }
        const deckList = deckKeys.map((key) => {
            return (
                <View key={key}>
                    <TextButton style={{ fontSize: 24 }} onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        {entryId: key}
                    )}>
                    {entries[key].name}    
                    </TextButton>     
                    <Text style={{ textAlign: 'center' }}>{entries[key].cards.length} cards</Text>                    
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