import React, { Component } from 'react';
import { Text, View, ScrollView, Button, DeviceEventEmitter, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './login.style';
import { navigate } from '~/services/navigationService';
import CustomInput from '~/components/input';
import CustomButton from '~/components/button';
import { logInWithFacebook } from '~/services/facebookAuth';
import { logIn } from '~/services/authService';

const initialState = {
    email: '',
    password: '',
    submited: false,
    loading: '',
    erroMsg: '',
    notConfirmed: false
};

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }
    componentDidMount() {
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }

    load = () => {
        this.props.navigation.setParams({ feedback: null })
    }
    login() {
        const _self = this;
        let { email, password } = this.state;

        this.setState({
            submited: true
        });
        if (email !== "" && password !== "") {

            this.setState({
                loading: 'login'
            });
            logIn(this.state.email, this.state.password).then(p => {
                console.log("p: ", p);
                if (p.success) {

                    if (p.type == 0) {
                        var obj = JSON.parse(p.data);
                        obj.token = p.token;
                        DeviceEventEmitter.emit('setUser', obj);
                        _self.setState({ loading: null, erroMsg: null, notConfirmed: false });
                    } else {
                        _self.setState({ loading: null, erroMsg: null, notConfirmed: true });
                    }
                } else {
                    _self.setState({ loading: null, erroMsg: p.message, notConfirmed: false });
                }
            }).catch(() => {
                _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.', notConfirmed: false });
            });
        }


    }

    loginfacebook() {
        const _self = this;
        _self.setState({ loading: 'facebook' });
        logInWithFacebook(false).then(p => {
            if (p.success) {
                if (p.type == 0) {
                    var obj = JSON.parse(p.data);
                    console.log("obj: ", obj);
                    obj.token = p.token;
                    DeviceEventEmitter.emit('setUser', obj);
                    _self.setState({ loading: null, erroMsg: null, notConfirmed: false });
                } else {
                    _self.setState({ loading: null, erroMsg: null, notConfirmed: true });
                }
            } else {
                _self.setState({ loading: null, erroMsg: p.message, notConfirmed: false });
            }
        }).catch(() => {
            _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.', notConfirmed: false });
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
    sendEmail() {
        this.nav('ConfirmEmail');
    }

    nav(route = null, params = null) {
        this.setState(initialState);
        navigate(route, params)
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
    feedbackMessage() {
        if (this.state.notConfirmed) {
            return (
                <View style={styles.feedbackMsg}>
                    <Text style={styles.feedbackBoxText}>Esta conta ainda não foi confirmada, caso não tenha recebido o email, <Text onPress={() => this.sendEmail()} style={styles.linkText}>clique aqui</Text> para reenviar o email de confirmação.</Text>
                </View>
            );
        } else if ((this.props.route.params != undefined && this.props.route.params.feedback != null)) {
            return (
                <View style={styles.feedbackMsg}>
                    <Text style={styles.feedbackBoxText}>{this.props.route.params.feedback}</Text>
                </View>
            );
        }
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
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
                            this.nav('ForgetPassword');
                        }}>
                            <Text style={styles.forgottenPasswordbuttonText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                    {this.feedbackMessage()}
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
                            event={() => { this.nav('Register') }}
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
            </ScrollView>
        );
    }
}

