import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from "react-redux";
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';
import { formatCard } from '../utils/decks'
import { addCard } from "../actions";
import { submitEntry, removeEntry } from "../utils/api";

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    };
    addButton = () => {

        //Do not allow blank Questions or Answers
        if (this.state.question.trim() === '' ||  this.state.question.trim() === null ||
            this.state.answer.trim() === '' ||  this.state.answer.trim() === null) {
            this.props.navigation.navigate(
                'DeckDetail')
            return
        }

        const { entryId } = this.props.navigation.state.params;

        entry = formatCard(entryId, this.state.question, this.state.answer)

        console.log("addButton: entry=", entry)

        this.props.dispatch(
            addCard({
                entry
            })
        );

        const { entries } = this.props

        tempEntries = entries

        tempEntries[entryId].cards = tempEntries[entryId].cards.concat([entry.cards])

        submitEntry(tempEntries[entryId], entryId);

        //Clear out text
        this.setState(() => ({
            question: '',
            answer: ''
        }))

        // Route to Deck Detail
        this.props.navigation.navigate(
            'DeckDetail')

    };

    render() {

        const key = this.props.navigation.state.params.entryId

        const { entries } = this.props

        return (
            <View style={{ alignItems: 'center' }}>
                <Text>{entries[key].name}</Text>
                {/* <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 14 }}>Question</Text> */}
                <TextInput style={styles.input}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                ></TextInput>
                {/* <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 14 }}>Answer</Text> */}
                <TextInput style={styles.input}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                ></TextInput>
                <TouchableOpacity style={styles.Addbtn} onPress={this.addButton}>
                    <Text>Create Card</Text>
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
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 60,
        margin: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        height: 44,
        // padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 20,
    },
})

function mapStateToProps(entries, props) {
    return {
        entries,
    }
}

export default connect(mapStateToProps)(AddCard);
