import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, TextButton } from 'react-native';
import styles from './button.style';
import Icon from '~/components/icon';

class CustomButton extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        event: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    }
    state = {
        errorMessage: null
    };
    render = () => {
        const { content, type, event, disabled } = this.props;

        if (type === "default") {
            return (
                <TouchableOpacity onPress={event}>
                    <Text style={[styles.button, styles.buttonDisabled]}>
                        {content}
                        </Text>
                </TouchableOpacity>
            );
        } else if (type === "facebook") {
            return (
                <TouchableOpacity onPress={event} style={[!disabled ? styles.buttonFacebook : styles.buttonFacebookDisabled]}>
                    <Icon
                        size={26}
                        name={'facebook'}
                        type={'FontAwesome'}
                        style={styles.facebooklogo}
                    />
                    <Text style={styles.facebookText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}
export default CustomButton;