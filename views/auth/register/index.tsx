import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './register.style';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Register</Text>
            </View>
        );
    }
}

