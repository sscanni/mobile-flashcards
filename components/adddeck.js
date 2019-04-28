import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';
import { formatDeck } from '../utils/decks'
import { connect } from "react-redux";
import { addEntry } from "../actions";
import { submitEntry, removeEntry } from "../utils/api";

class AddDeck extends Component {

    state = { text: '' };

    addButton = () => {

        deckName = this.state.text

        //Do not allow blank Deck names
        if (deckName.trim() === '' || deckName.trim() === null) {
            this.props.navigation.navigate(
                'DeckList')
            return
        }

        entry = formatDeck(deckName)

        submitEntry( entry, deckName );
        
        this.props.dispatch(
            addEntry({
                [deckName]: entry
            })
        );

        //Clear out text
        this.setState(() => ({
            text: ''
        }))

        // Route to Home
        this.props.navigation.navigate(
            'DeckList')

    };

    render() {
    return (
        <View style={{alignItems: 'center'}}> 
            {
            Platform.OS === 'ios' 
            ? 
            <Text style={{ textAlign: 'center', marginTop: 60, fontSize: 12 }}>What is the title of your new deck?</Text>
            :
            <Text style={{ textAlign: 'center', marginTop: 60, fontSize: 24 }}>What is the title of your new deck?</Text>
            }
            
            <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
            ></TextInput>
            <TouchableOpacity style={styles.Addbtn} onPress={this.addButton}>
                <Text>Create Deck</Text>
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
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
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
    input: {
        width: 200, 
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 40,
        },        
    })

    function mapStateToProps(props) {
        return {}
    }
                        
    export default connect(mapStateToProps)(AddDeck);