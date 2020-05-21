import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import styles from './input.style';
import Icon from '~/components/icon';

class CustomInput extends Component {
    constructor(props: any) {
        super(props);
    }
    static propTypes = {
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        submited: PropTypes.bool.isRequired,
        changeValue: PropTypes.func.isRequired,
        limit: PropTypes.number
    }
    state = {
        secureTextEntry: true,
        feedbackError: ''
    };
    passwordVisible() {
        if (this.props.value !== '') {
            if (this.state.secureTextEntry) {
                return (
                    <Icon
                        size={14}
                        name={'eye'}
                        type={'FontAwesome'}
                    />
                );
            } else {
                return (
                    <Icon
                        size={14}
                        name={'eye-slash'}
                        type={'FontAwesome'}
                    />
                );
            }
        } else {
            return null;
        }
    }
    showError() {
        if (this.props.submited) {
            if (this.props.value == '') {
                return (
                    <View style={styles.erroBox}>
                        <Text style={styles.erroText}>Preencha o campo {this.props.placeholder}</Text>
                    </View>
                )
            }
        }
    }
    render = () => {
        let { type, placeholder, submited, changeValue, value, limit } = this.props;

        if (type === "email") {
            return (
                <View style={styles.inputArea}>
                    <View style={submited && value === '' ? styles.inputerror : styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder={placeholder}
                            onChangeText={text => changeValue(text)}
                            value={value}
                            maxLength={limit}
                        />
                    </View>
                    {this.showError()}
                </View>
            );
        } else if (type === "secret") {
            return (
                <View style={styles.inputArea}>
                    <View style={submited && value === '' ? styles.inputerror : styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder={placeholder}
                            secureTextEntry={this.state.secureTextEntry}
                            onChangeText={text => changeValue(text)}
                            value={value}
                            maxLength={limit}
                        />
                        <TouchableOpacity style={styles.showPassword} onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                            {this.passwordVisible()}
                        </TouchableOpacity>
                    </View>
                    {this.showError()}
                </View>
            );
        } else if (type === "number") {
            return (
                <View style={styles.inputArea}>
                    <View style={submited && value === '' ? styles.inputerror : styles.input}>
                        <TextInput
                            style={styles.inputText}
                            keyboardType='numeric'
                            autoCapitalize="none"
                            placeholder={placeholder}
                            onChangeText={text => changeValue(text)}
                            value={value}
                            maxLength={limit}
                        />
                    </View>
                    {this.showError()}
                </View>
            );
        }
    }
}
export default CustomInput;