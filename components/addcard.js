import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';

class AddCard extends Component {

    state = { text: '' };

    addButton = () => {

        console.log("Question Submitted:", this.state.question)
        console.log("Answer Submitted:", this.state.answer)
        
        // this.props.dispatch(
        //     addEntry({
        //         [key]: getDailyReminderValue()
        //     })
        // );

        //Clear out text
        this.setState(() => ({
            question: '',
            answer: ''
        }))

        // Route to Home
        this.props.navigation.navigate(
            'DeckDetail')

    };

    render() {
    return (
        <View style={{alignItems: 'center'}}>
            {/* <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 14 }}>Question</Text> */}
            <TextInput style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
            ></TextInput>
            {/* <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 14 }}>Answer</Text> */}
            <TextInput style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
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
        width: 300, 
        height: 44,
        // padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 20,
        },        
    })
export default AddCard