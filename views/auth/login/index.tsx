import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './feed.style';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
            </View>
        );
    }
}

