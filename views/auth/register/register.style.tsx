import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 60,
        width: '100%',
        height: 70
    },
    loginBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 5
    },
    inputGroupCheckbox: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
    },
    infoText: {
        color: '#FFF',
        lineHeight: 30,
        fontSize: 12,
        fontFamily: 'SourceSansPro-Bold',
        marginLeft: 5
    },
    input: {
        backgroundColor: '#222',
        width: '100%',
        height: 60,
        marginTop: 10,
        padding: 15,
        color: '#FFF',
        borderRadius: 10
    },
    inputerror: {
        backgroundColor: '#222',
        width: '100%',
        height: 60,
        marginTop: 10,
        padding: 15,
        color: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D00',
    },
    errorFeedback: {
        color: '#F00',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Bold'
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    facebookButton: {
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: '#3A559F',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5
    },
    facebooklogo: {
        marginRight: 20
    },
    divider: {
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 20,
        marginBottom: 0
    },
    dividerText: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: -12
    },
    button: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Bold',
        borderRadius: 5
    },
    buttonPrimary: {
        backgroundColor: '#006CD8',
    },
    buttonSecondary: {
        backgroundColor: '#444444',
    }
});

