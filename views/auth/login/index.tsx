import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter } from 'react-native';
import styles from './login.style';
import { navigate} from '../../../services/navigationService'

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
                <Button
                    onPress={() => navigate('Register')}
                    title="Register"
                />
                <Button
                    onPress={() => navigate('ForgetPassword')}
                    title="ForgetPassword"
                />
                <Button
                    onPress={() => {
                        DeviceEventEmitter.emit('setUser', 'LOGIN');
                    }}
                    title="Login"
                />
            </View>
        );
    }
}

