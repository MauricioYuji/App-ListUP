import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './forgetpassword.style';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>forget passwrd</Text>
            </View>
        );
    }
}

