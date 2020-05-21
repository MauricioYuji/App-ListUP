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
    Feedback: {
        color: '#0F0',
    },
    defaultText: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Regular'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Bold'
    },
    buttonGroup: {
        flexDirection: 'row',
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

