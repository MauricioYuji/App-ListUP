import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './login.style';
import { navigate } from '~/services/navigationService';
import CustomInput from '~/components/input';
import CustomButton from '~/components/button';
import { logInWithFacebook } from '~/services/facebookAuth';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            submited: false
        };
    }
    login() {
        console.log("LOGIN: ", this.state);
        this.setState({
            submited: true
        });

        //var obj = "";
        //DeviceEventEmitter.emit('setUser', obj);
    }

    loginfacebook() {
        const _self = this;
        logInWithFacebook(false).then(p => {
            console.log("p: ", p);
            if (p.success) {
                if (p.type == 0) {
                    var obj = JSON.parse(p.data);
                    obj.token = p.token;
                    DeviceEventEmitter.emit('setUser', obj);
                    //_self.setState({ errorMessage: null, feedback: null, loading: null });
                } else {
                    //_self.setState({ errorMessage: null, feedback: p.message, emailSend: true, loading: null });
                }
            } else {
                //_self.setState({ errorMessage: p.message, loading: null });
            }
        }).catch(() => {
            //_self.setState({ errorMessage: 'Ocorreu algum erro, tente novamente.', loading: null });
        });
    }
    changeEmail(data) {
        this.setState({
            email: data,
            submited: false
        });
    }
    changePassword(data) {
        this.setState({
            password: data,
            submited: false
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('~/assets/images/logo-icon.png')} style={styles.logo} />
                <CustomInput
                    type={'email'}
                    placeholder={'Email'}
                    value={this.state.email}
                    changeValue={this.changeEmail.bind(this)}
                    submited={this.state.submited}
                />
                <CustomInput
                    type={'secret'}
                    placeholder={'Senha'}
                    value={this.state.password}
                    changeValue={this.changePassword.bind(this)}
                    submited={this.state.submited}
                    limit={30}
                />
                <View style={styles.forgottenPassword}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ForgetPassword');
                    }}>
                        <Text style={styles.forgottenPasswordbuttonText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowButtons}>
                    <CustomButton
                        content={'Entrar'}
                        type={'default'}
                        event={() => { this.login() }}
                    />
                    <CustomButton
                        content={'Criar uma conta'}
                        type={'default'}
                        event={() => { this.props.navigation.navigate('Register') }}
                    />
                </View>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>OU</Text>
                </View>
                <View style={styles.rowButtons}>
                    <CustomButton
                        content={'Entrar com Facebook'}
                        type={'facebook'}
                        event={() => { this.loginfacebook() }}
                    />
                </View>
            </View>
        );
    }
}

