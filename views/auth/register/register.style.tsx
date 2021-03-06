import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    logo: {
        marginBottom: 10,
        resizeMode: "contain",
        width: '100%'
    },
    rowButtons: {
        alignItems: "stretch",
        alignSelf: "stretch",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingVertical: 30
    },
    divider: {
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 0,
        marginBottom: 0
    },
    dividerText: {
        color: '#FFF',
        backgroundColor: '#111',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        marginBottom: -12
    },
    feedbackMsg: {
        padding: 5,
        textAlign: "center"
    },
    feedbackBoxText: {
        color: '#FFF'
    },
    erroBoxText: {
        color: '#D00'
    }
});

