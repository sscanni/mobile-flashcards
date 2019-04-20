import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';

class DeckDetail extends Component {
    
    addButton = () => {

        console.log("Add Card Pressed:")
        
        this.props.navigation.navigate(
            'AddCard')
    
    };
    render() {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{ textAlign: 'center', marginTop: 60, fontSize: 24 }}>Deck Detail - { this.props.navigation.state.params.entryId }</Text>
            <Text style={{ textAlign: 'center', paddingTop: 10 }}>3 cards</Text>
            <TouchableOpacity style={styles.Addbtn} onPress={this.addButton}>
                <Text>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Addbtn} onPress={() => console.log('Pressed!')}>
                <Text>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Deletebtn} onPress={() => console.log('Pressed!')}>
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
export default DeckDetail