import { StyleSheet } from 'react-native';
import Layout from '~/constants/Layout'


export default StyleSheet.create({
    button: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Bold',
        backgroundColor: '#006CD8',
        borderRadius: 5
    },
    buttonDisabled: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Bold',
        backgroundColor: '#444444',
        borderRadius: 5
    },
    buttonFacebook: {
        flexDirection: 'row',
        backgroundColor: '#3A559F',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 30,
        borderRadius: 5
    },
    buttonFacebookDisabled: {
        flexDirection: 'row',
        backgroundColor: '#444444',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5
    },
    facebooklogo: {
        marginRight: 20
    },
    facebookText: {
        color: '#FFF'
    },
});