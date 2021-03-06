import React, { Component } from 'react'
import { connect } from "react-redux";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Switch } from 'react-native'
import { red, black } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

class Quiz extends Component {

    state = {
        question: true,
        card: 0,
        answerSel: "",
        correctCount: 0,
        results: false

    };
    answerButton = () => {

        this.setState(() => ({
            question: false,
        }));

    };
    nextButton = () => {

        const { card, correctCount, answerSel } = this.state;

        cnt = correctCount

        if (answerSel === "yes") {
            cnt = correctCount + 1
        } 

        this.setState(() => ({
            question: true,
            card: card + 1,
            answerSel: "",
            correctCount: cnt
        }));

        console.log("nextButton: correctCount=", cnt)

    };

    viewResults = () => {

        const { correctCount, answerSel } = this.state;
        const key = this.props.navigation.state.params.entryId

        cnt = correctCount

        if (answerSel === "yes") {
            cnt = correctCount + 1
        } 

        this.setState(() => ({
            question: false,
            correctCount: cnt,
            results: true
        }));

        clearLocalNotification()
            .then(setLocalNotification)

    };
    toggleYesButton = () => {

        this.setState(() => ({
            answerSel: "yes"
        }));

    };
    toggleNoButton = () => {

        this.setState(() => ({
            answerSel: "no"
        }));

    };
    render() {

        const key = this.props.navigation.state.params.entryId

        const { entries } = this.props

        if (this.state.results) {
            return (
                <View style={{alignItems: 'center'}}>
                    <Text  style={{ textAlign: 'center', marginTop: 60, fontSize: 18 }}>Quiz Results</Text>
                    <Text  style={{ textAlign: 'center', marginTop: 60, fontSize: 18 }}>{this.state.correctCount} out of {entries[key].cards.length} correct</Text>
                    <TouchableOpacity style={styles.Addbtn} onPress={() => this.props.navigation.push(
                                        'Quiz',
                                        {entryId: key}
                                        )}>
                        <Text style={{ fontSize: 16 }}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Addbtn} onPress={() => this.props.navigation.navigate(
                                        'DeckList'
                                        )}>
                        <Text style={{ fontSize: 16 }}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ alignItems: 'center' }}>
                {this.state.question === true ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24 }}>Question# {this.state.card + 1} of {entries[key].cards.length}</Text>
                        <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24 }}>{entries[key].cards[this.state.card].question}?</Text>
                        <TouchableOpacity style={styles.Addbtn} onPress={this.answerButton}>
                            <Text style={{ fontSize: 16 }}>See Answer</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24 }}>Answer# {this.state.card + 1} of {entries[key].cards.length}</Text>
                            <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24 }}>{entries[key].cards[this.state.card].answer}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 30, }}>Answered Correctly?</Text>

                            <TouchableOpacity onPress={this.toggleYesButton}>
                                {this.state.answerSel === "yes" ? (
                                    <Text style={{ fontSize: 16, color: red }}>Yes</Text>
                                ) : (
                                        <Text style={{ fontSize: 16, color: black }}>Yes</Text>
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleNoButton}>
                                {this.state.answerSel === "no" ? (
                                    <Text style={{ fontSize: 16, color: red }}>No</Text>
                                ) : (
                                        <Text style={{ fontSize: 16, color: black }}>No</Text>
                                    )}
                            </TouchableOpacity>
                            {this.state.card + 1 === entries[key].cards.length ? (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20, }}>No more Cards</Text>
                                    <TouchableOpacity style={styles.Addbtn} onPress={this.viewResults}>
                                        <Text style={{ fontSize: 16 }}>View Results</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                    <TouchableOpacity style={styles.Addbtn} onPress={this.nextButton}>
                                        <Text style={{ fontSize: 16 }}>Next Question</Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    )}
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
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
function mapStateToProps(entries, props) {
    return {
        entries,
    }
}

export default connect(mapStateToProps)(Quiz);

