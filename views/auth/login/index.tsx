import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './login.style';
import { navigate } from '~/services/navigationService';
import CustomInput from '~/components/input';
import CustomButton from '~/components/button';
import { logInWithFacebook } from '~/services/facebookAuth';
import { logIn } from '~/services/authService';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            submited: false,
            loading: '',
            erroMsg: ''
        };
    }
    login() {
        const _self = this;
        //console.log("LOGIN: ", this.state);
        this.setState({
            submited: true,
            loading: 'login'
        });


        logIn(this.state.email, this.state.password).then(p => {
            //console.log("p: ", p);
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
            //_self.setState({ errorMessage: p.message, loading: null });
        });


        //var obj = "";
        //DeviceEventEmitter.emit('setUser', obj);

        //_self.setState({
        //    submited: true,
        //    loading: 'login', erroMsg: 'Ocorreu um erro, tente novamente.' });
    }

    loginfacebook() {
        const _self = this;
        _self.setState({ loading: 'facebook' });
        logInWithFacebook(false).then(p => {
            console.log("p: ", p);
            if (p.success) {
                if (p.type == 0) {
                    var obj = JSON.parse(p.data);
                    obj.token = p.token;
                    DeviceEventEmitter.emit('setUser', obj);
                    _self.setState({ loading: null, erroMsg: null });
                } else {
                    _self.setState({ loading: null, erroMsg: null });
                }
            } else {
                _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.' });
            }
        }).catch(() => {
            _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.' });
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
    feedbackerrorMessage() {
        if (this.state.erroMsg) {
            return (
                <View style={styles.erroBox}>
                    <Text style={styles.erroBoxText}>{this.state.erroMsg}</Text>
                </View>
            );
        }
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
                {this.feedbackerrorMessage()}
                <View style={styles.rowButtons}>
                    <CustomButton
                        content={'Entrar'}
                        type={'default'}
                        event={() => { this.login() }}
                        loading={this.state.loading === 'login'}
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
                        loading={this.state.loading === 'facebook'}
                    />
                </View>
            </View>
        );
    }
}

