import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './register.style';
import CustomInput from '~/components/input';
import CustomButton from '~/components/button';
import { navigate } from '~/services/navigationService';
import { logInWithFacebook } from '~/services/facebookAuth';
import { signIn } from '~/services/authService';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            password: '',
            passwordconfirm: '',
            submited: false,
            loading: '',
            erroMsg: ''
        };
    }
    signin() {
        const _self = this;
        //console.log("LOGIN: ", this.state);

        this.setState({
            submited: true
        });

        let { nome, email, password, passwordconfirm } = this.state;
        if (email !== "" && nome !== "" && password !== "" && passwordconfirm !== "") {
            this.setState({
                loading: 'register'
            });
            signIn(this.state.email, this.state.nome, this.state.password).then(p => {
                console.log("p: ", p);
                if (p.success) {

                    if (p.type == 0) {
                        _self.setState({ loading: null, erroMsg: null });
                    } else {
                        _self.props.navigation.navigate('Login', { feedback: p.message });
                    }
                } else {
                    _self.setState({ loading: null, erroMsg: p.message });
                }
            }).catch(() => {
                _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.' });
            });
        }

    }

    signinfacebook() {
        const _self = this;
        _self.setState({ loading: 'facebook' });
        logInWithFacebook(false).then(p => {
            if (p.success) {
                if (p.type == 0) {
                    var obj = JSON.parse(p.data);
                    console.log("obj: ", obj);
                    obj.token = p.token;
                    DeviceEventEmitter.emit('setUser', obj);
                    _self.setState({ loading: null, erroMsg: null });
                } else {
                    _self.props.navigation.navigate('Login', { feedback: p.message });
                }
            } else {
                _self.setState({ loading: null, erroMsg: p.message });
            }
        }).catch(() => {
            _self.setState({ loading: null, erroMsg: 'Ocorreu um erro, tente novamente.' });
        });
    }


    changeNome(data) {
        this.setState({
            nome: data,
            submited: false
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
    changePasswordConfirm(data) {
        this.setState({
            passwordconfirm: data,
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
    feedbackMessage() {
        if (this.state.feedbackMsg) {
            return (
                <View style={styles.feedbackMsg}>
                    <Text style={styles.feedbackBoxText}>{this.state.feedbackMsg}</Text>
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
                        type={'text'}
                        placeholder={'Nome'}
                        value={this.state.nome}
                        changeValue={this.changeNome.bind(this)}
                        submited={this.state.submited}
                    />
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
                    <CustomInput
                        type={'secret'}
                        placeholder={'Confirmar senha'}
                        value={this.state.passwordconfirm}
                        changeValue={this.changePasswordConfirm.bind(this)}
                        submited={this.state.submited}
                        limit={30}
                    />
                    {this.feedbackerrorMessage()}
                    <View style={styles.rowButtons}>
                        <CustomButton
                            content={'Voltar'}
                            type={'secondary'}
                            event={() => { navigate('Login', { feedback: null }) }}
                        />
                        <CustomButton
                            content={'Criar uma conta'}
                            type={'default'}
                            event={() => { this.signin() }}
                            loading={this.state.loading === 'register'}
                        />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.dividerText}>OU</Text>
                    </View>
                    <View style={styles.rowButtons}>
                        <CustomButton
                            content={'Entrar com Facebook'}
                            type={'facebook'}
                            event={() => { this.signinfacebook() }}
                            loading={this.state.loading === 'facebook'}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
