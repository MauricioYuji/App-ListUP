import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './register.style';
import { navigate } from '../../../services/navigationService';
import Icon from '../../../components/icon';

export default class Register extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };
    state = {
        name: { value: '', errorMessage: null }, email: { value: '', errorMessage: null }, password: { value: '', errorMessage: null }, confirmpassword: { value: '', errorMessage: null }, feedback: null
    };

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            return true;
        }
    }

    facebooklogin() {
        const _self = this;
        this.setState({ loading: 'facebook' });

        signInWithFacebook().then(p => {
            if (p.success) {
                var obj = JSON.parse(p.data);
                obj.token = p.token;
                DeviceEventEmitter.emit('setUser', obj);
                _self.setState({ errorMessage: null, loading: null, feedback: p.message });
            } else {
                _self.setState({ errorMessage: p.message, loading: null, feedback: null });
            }
        }).catch(() => {
            _self.setState({ errorMessage: p.message, loading: null });
        });
    }
    register() {
        const _self = this;
        const { name, email, password, confirmpassword } = this.state;

        this.setState({
            loading: 'register', name: { value: this.state.name.value, errorMessage: null }, email: { value: this.state.email.value, errorMessage: null }, password: { value: this.state.password.value, errorMessage: null }, confirmpassword: { value: this.state.confirmpassword.value, errorMessage: null }
        });
        var validate = true;
        if (name.value.length == 0) {
            validate = false;
            this.setState({
                name: { value: this.state.name.value, errorMessage: "Preencha o campo nome!" }
            });
        }
        if (email.value.length == 0) {
            validate = false;
            this.setState({
                email: { value: this.state.email.value, errorMessage: "Preencha o campo email!" }
            });
        }
        if (password.value.length == 0) {
            validate = false;
            this.setState({
                password: { value: this.state.password.value, errorMessage: "Preencha o campo password!" }
            });
        }
        if (confirmpassword.value.length == 0) {
            validate = false;
            this.setState({
                confirmpassword: { value: this.state.confirmpassword.value, errorMessage: "Preencha o campo confirm password!" }
            });
        }
        if (email.value.length > 0 && !this.validate(email.value)) {
            validate = false;
            this.setState({
                email: { value: this.state.email.value, errorMessage: "Email Inválido!" }
            });
        }
        if (password.value.length > 0 && password.value.length < 6) {
            validate = false; this.setState({
                password: { value: this.state.password.value, errorMessage: "Senhas deve conter pelo menos 6 caracteres!" }
            });
        }
        if (password.value.length > 0 && password.value !== confirmpassword.value) {
            validate = false;
            this.setState({
                password: { value: this.state.password.value, errorMessage: "Senhas devem ser iguais!" },
                confirmpassword: { value: this.state.confirmpassword.value, errorMessage: "Senhas devem ser iguais!" }
            });
        }

        if (validate) {
            this.setState({
                emailerrorMessage: null, passworderrorMessage: null, confirmpassworderrorMessage: null
            });

            signIn(email.value, name.value, password.value).then(p => {
                console.log("RETORNO CADASTRO: ", p);
                if (p.success) {
                    _self.setState({ errorMessage: null, loading: null, feedback: p.message });
                } else {
                    _self.setState({ errorMessage: p.message, loading: null, feedback: null });
                }
            });
        } else {
            this.setState({
                loading: null
            });
        }
    }


    renderButton() {
        if (this.state.loading === "register") {
            return (
                <View style={[styles.button, styles.buttonPrimary]}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
            );
        } else if (this.state.feedback === null) {
            return (
                <View style={[styles.button, styles.buttonPrimary]}>
                    <TouchableOpacity onPress={() => {
                        this.register();
                    }}>
                        <Text style={styles.buttonText}>
                            Criar conta
                                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    render() {
        const loadingButton = this.state.loading;
        const feedback = this.state.feedback;
        let feedbackerrorMessage = null;
        let nameerrorMessage;
        let emailerrorMessage;
        let passworderrorMessage;
        let confirmpassworderrorMessage;
        if (this.state.name.errorMessage !== null) {
            nameerrorMessage = <Text style={styles.errorFeedback}>{this.state.name.errorMessage}</Text>;
        }
        if (this.state.email.errorMessage !== null) {
            emailerrorMessage = <Text style={styles.errorFeedback}>{this.state.email.errorMessage}</Text>;
        }
        if (this.state.password.errorMessage !== null) {
            passworderrorMessage = <Text style={styles.errorFeedback}>{this.state.password.errorMessage}</Text>;
        }
        if (this.state.confirmpassword.errorMessage !== null) {
            confirmpassworderrorMessage = <Text style={styles.errorFeedback}>{this.state.confirmpassword.errorMessage}</Text>;
        }
        if (this.state.errorMessage !== null) {
            feedbackerrorMessage = <Text style={styles.errorFeedback}>{this.state.errorMessage}</Text>;
        }
        return (
            <View style={styles.container}
                keyboardShouldPersistTaps='handled'>
                <View style={styles.loginBox}>

                    <Image source={require('~/assets/images/logo-icon.png')} style={styles.logo} />

                    {feedback === null ? (
                        <View style={styles.inputGroup}>
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={this.state.name.errorMessage !== null ? styles.inputerror : styles.input}
                                    autoCapitalize="none"
                                    placeholder="Nome"
                                    onChangeText={text => this.setState({ name: { value: text, errorMessage: null } })}
                                    value={this.state.name.value}
                                />
                                {nameerrorMessage}
                            </View>
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={this.state.email.errorMessage !== null ? styles.inputerror : styles.input}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    onChangeText={text => this.setState({ email: { value: text, errorMessage: null } })}
                                    value={this.state.email.value}
                                />
                                {emailerrorMessage}
                            </View>
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={this.state.password.errorMessage !== null ? styles.inputerror : styles.input}
                                    autoCapitalize="none"
                                    placeholder="Password"
                                    onChangeText={text => this.setState({ password: { value: text, errorMessage: null } })}
                                    value={this.state.password.value}
                                    secureTextEntry={true}
                                />
                                {passworderrorMessage}
                            </View>
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={this.state.confirmpassword.errorMessage !== null ? styles.inputerror : styles.input}
                                    autoCapitalize="none"
                                    placeholder="Confirm Password"
                                    onChangeText={text => this.setState({ confirmpassword: { value: text, errorMessage: null } })}
                                    value={this.state.confirmpassword.value}
                                    secureTextEntry={true}
                                />
                                {confirmpassworderrorMessage}
                            </View>
                            {feedbackerrorMessage}
                        </View>
                    ) : (
                            <Text style={styles.buttonText}>{feedback}</Text>
                        )}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login'); }}>
                            <Text style={[styles.button, styles.buttonSecondary]}>
                                Voltar
                        </Text>
                        </TouchableOpacity>

                        {this.renderButton()}
                    </View>

                    <View style={styles.divider}>
                        <Text style={styles.dividerText}>OU</Text>
                    </View>
                    <View style={styles.facebookButton}>
                        {loadingButton === "facebook" ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                                <TouchableOpacity onPress={() => { this.facebooklogin(); }} style={styles.buttonGroup}>
                                    <Icon
                                        size={26}
                                        name={'facebook'}
                                        type={'FontAwesome'}
                                        style={styles.facebooklogo}
                                    />
                                    <Text style={styles.buttonText}>
                                        Entrar com Facebook
                                    </Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>

            </View >
        );
    }
}
