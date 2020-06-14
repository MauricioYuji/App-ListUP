import React, { Component } from 'react';
import { Text, View, Button, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from './confirmemail.style';
import { navigate } from '~/services/navigationService';
import CustomButton from '~/components/button';
import CustomInput from '~/components/input';
import { confirmEmail } from '~/services/authService';

export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submited: false,
            loading: '',
            erroMsg: ''
        };
    }
    enviar() {

        const { email } = this.state;

        this.setState({ loading: 'enviar' });
        confirmEmail(email).then(p => {
            if (p.success) {
                this.props.navigation.navigate('Login', { feedback: p.message });
            } else {
                this.setState({ loading: null, erroMsg: null });
            }
        });
    }
    changeEmail(data) {
        this.setState({
            email: data,
            submited: false
        });
    }

    feedbackerrorMessage() {
        if (this.state.erroMsg) {
            return (
                <View style={styles.feedbackMsg}>
                    <Text style={styles.erroBoxText}>{this.state.erroMsg}</Text>
                </View>
            );
        }
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <Image source={require('~/assets/images/logo-icon.png')} style={styles.logo} />
                    <Text style={styles.defaultTitle}>Não confirmou sua conta?</Text>
                    <Text style={styles.defaultText}>Informe o seu email de cadastro para o reenvio de confirmação de email</Text>
                    <CustomInput
                        type={'email'}
                        placeholder={'Email'}
                        value={this.state.email}
                        changeValue={this.changeEmail.bind(this)}
                        submited={this.state.submited}
                    />

                    {this.feedbackerrorMessage()}
                    <View style={styles.rowButtons}>
                        <CustomButton
                            content={'Voltar'}
                            type={'secondary'}
                            event={() => { navigate('Login', { feedback: null }) }}
                        />
                        <CustomButton
                            content={'Enviar'}
                            type={'default'}
                            event={() => { this.enviar() }}
                            loading={this.state.loading === 'enviar'}
                        />
                    </View>

                </View>
            </ScrollView>
        );

    }
}

