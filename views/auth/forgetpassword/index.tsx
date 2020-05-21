import React, { Component } from 'react';
import { Text, View, Button, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './forgetpassword.style';
import { navigate } from '../../../services/navigationService';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        secureTextEntry: true, email: '', feedback: null, errorMessage: null, loading: null
    };
    enviar() {

        const { email } = this.state;

        this.setState({ loading: 'enviar' });
        forgetpassword(email).then(p => {
            if (p.success) {
                this.setState({ errorMessage: null, loading: null, feedback: p.message });
            } else {
                this.setState({ errorMessage: p.message, loading: null, feedback: null });
            }
        });
    }
    render() {
        const loadingButton = this.state.loading;
        let feedback;
        if (this.state.feedback !== null) {
            feedback = <Text style={styles.Feedback}>{this.state.feedback}</Text>;
        }
        let error;
        if (this.state.errorMessage !== null) {
            error = <Text style={styles.errorFeedback}>{this.state.errorMessage}</Text>;
        }
        return (
            <View style={styles.container}
                keyboardShouldPersistTaps='handled'>
                <View style={styles.loginBox}>

                    <Image source={require('~/assets/images/logo-icon.png')} style={styles.logo} />
                    <Text style={styles.defaultText}>Fale o seu email para enviarmos uma nova senha.</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={this.state.errorMessage !== null ? styles.inputerror : styles.input}
                            autoCapitalize="none"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>
                    <View>
                        {error}
                        {feedback}
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login'); }}>
                            <Text style={[styles.button, styles.buttonSecondary]}>
                                Voltar
                        </Text>
                        </TouchableOpacity>
                        <View style={[styles.button, styles.buttonPrimary]}>
                            {loadingButton === "enviar" ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                    <TouchableOpacity onPress={() => {
                                        this.enviar();
                                    }}>
                                        <Text style={styles.buttonText}>
                                            Enviar email
                        </Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

