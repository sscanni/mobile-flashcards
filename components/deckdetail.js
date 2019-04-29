import React, { Component } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, Animated } from 'react-native'
import { white, red } from '../utils/colors'
import { bold } from 'ansi-colors';
import { delDeck } from '../utils/decks'
import { receiveEntries } from "../actions";

class DeckDetail extends Component {

    state = {
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),
        ready: false
    }

    componentDidMount() {
        const { opacity, width, height } = this.state

        Animated.timing(opacity, { toValue: 1, duration: 1000 })
            .start()
        Animated.spring(width, { toValue: 300, speed: 5 })
            .start()
        Animated.spring(height, { toValue: 300, speed: 5 })
            .start(() => {
                this.setState(() => ({ ready: true }))
            })
    }
    quizButton = () => {

        const key = this.props.navigation.state.params.entryId

        const { entries } = this.props

        if (entries[key].cards.length > 0) {
            this.props.navigation.navigate(
                'Quiz',
                { entryId: key }
            )
        }
    };

    delButton = () => {

        const { entryId } = this.props.navigation.state.params;

        const { entries } = this.props

        newEntries = delDeck(entryId, entries)

        this.props.dispatch(receiveEntries(newEntries))

        // Route to Home
        this.props.navigation.navigate(
            'DeckList')

    };

    render() {

        const key = this.props.navigation.state.params.entryId

        const { entries } = this.props

        if (entries[key] == null) {
            return null
        }

        const { opacity, width, height, ready } = this.state

        if (!ready) {
            return (
                <View style={styles.container}>
                    <Animated.Image
                        style={[styles.img, { opacity, width, height }]}
                        // source={{ uri: 'https://tylermcginnis.com/tylermcginnis_glasses-300.png' }}
                        source={require('../assets/flashcards.png')} 
                        
                    />
                </View>
            )
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24 }}>{entries[key].name}</Text>
                <Text style={{ textAlign: 'center', paddingTop: 10 }}>{entries[key].cards.length} cards</Text>
                <TouchableOpacity style={styles.Addbtn} onPress={() => this.props.navigation.navigate(
                    'AddCard',
                    { entryId: key }
                )}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Addbtn} onPress={this.quizButton}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Deletebtn} onPress={this.delButton}>
                    <Text style={{ fontSize: 18, color: red }}>Delete Deck</Text>
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
        marginTop: 40,
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
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 200,
        height: 200,
    }
})
function mapStateToProps(entries, props) {
    return {
        entries,
    }
}

export default connect(mapStateToProps)(DeckDetail);

