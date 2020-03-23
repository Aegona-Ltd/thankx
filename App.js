import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

export default class App extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <AppNavigator />
            </View>
        );
    }
}
