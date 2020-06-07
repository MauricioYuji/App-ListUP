import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, TextButton, View, ActivityIndicator } from 'react-native';
import styles from './button.style';
import Icon from '~/components/icon';

class CustomButton extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        event: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        loading: PropTypes.bool
    }
    state = {
        errorMessage: null
    };
    render = () => {
        const { content, type, event, disabled, loading } = this.props;

        if (type === "default") {
            return (
                <View style={[!disabled ? styles.button : styles.buttonDisabled]}>
                    {loading && (
                        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loadingIcon} />
                    )}
                    <TouchableOpacity onPress={event} style={[styles.clickArea, loading && styles.hiddenButton]} disabled={loading || disabled}>
                        <Text style={[!disabled ? styles.buttonText : styles.buttonTextDisabled]}>
                            {content}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (type === "secondary") {
            return (
                <View style={[!disabled ? styles.buttonSecondary : styles.buttonDisabled]}>
                    {loading && (
                        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loadingIcon} />
                    )}
                    <TouchableOpacity onPress={event} style={[styles.clickArea, loading && styles.hiddenButton]} disabled={loading || disabled}>
                        <Text style={[!disabled ? styles.buttonText : styles.buttonTextDisabled]}>
                            {content}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (type === "facebook") {
            return (
                <View style={[!disabled ? styles.buttonFacebook : styles.buttonFacebookDisabled]}>
                    {loading && (
                        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loadingIcon} />
                    )}
                    <TouchableOpacity onPress={event} style={[styles.clickArea, loading && styles.hiddenButton]} disabled={loading || disabled}>
                        <Icon
                            size={26}
                            name={'facebook'}
                            type={'FontAwesome'}
                            style={styles.facebooklogo}
                        />
                        <Text style={[!disabled ? styles.buttonText : styles.buttonTextDisabled]}>
                            {content}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}
export default CustomButton;