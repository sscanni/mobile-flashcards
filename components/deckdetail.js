import React, { Component } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';
import { delDeck } from '../utils/decks'

class DeckDetail extends Component {
    
    delButton = () => {

        const { entryId } = this.props.navigation.state.params;

        console.log("delButton key=:", entryId)

        delDeck(entryId)

        // Route to Home
        this.props.navigation.navigate(
            'History')

    };
    render() {

    const key = this.props.navigation.state.params.entryId

    const { entries } = this.props

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{ textAlign: 'center', marginTop: 60, fontSize: 24 }}>Deck Detail - { entries[key].name }</Text>
            <Text style={{ textAlign: 'center', paddingTop: 10 }}>{entries[key].cards.length} cards</Text>
            <TouchableOpacity style={styles.Addbtn} onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        {entryId: key}
                    )}>
                <Text>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Addbtn} onPress={() => console.log('Pressed!')}>
                <Text>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Deletebtn} onPress={this.delButton}>
                <Text style={{ fontSize: 24, color: red }}>Delete Deck</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    Addbtn: {
        textAlign: 'center', 
        width: 200,
        height: 50,
        borderWidth: 2,
        // backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        // padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
        },
    Deletebtn: {
        textAlign: 'center', 
        borderWidth: 0,
        color: red,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
        },
    })
    function mapStateToProps(entries, props) {
        return {
            entries,
        }
    }
                        
    export default connect(mapStateToProps)(DeckDetail);

