import { StyleSheet } from 'react-native';
import Layout from '~/constants/Layout'


export default StyleSheet.create({
    inputArea: {
        width: '100%',
        marginTop: 15,
    },
    input: {
        backgroundColor: '#222',
        width: '100%',
        height: 60,
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
    erroBox: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    erroText: {
        color: '#F00',
    },
    inputText: {
        color: '#FFF',
    },
    showPassword: {
        marginLeft: 5,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 15,
        bottom: 0,
        zIndex: 100
    },
});