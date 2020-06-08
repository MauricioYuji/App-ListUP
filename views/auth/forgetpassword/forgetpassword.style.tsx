import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    logo: {
        marginBottom: 60,
        resizeMode: "contain",
        width: '100%'
    },
    defaultTitle: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Light',
        textAlign: "left",
        marginBottom: 10
    },
    defaultText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'SourceSansPro-Regular'
    },
    rowButtons: {
        alignItems: "stretch",
        alignSelf: "stretch",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingVertical: 30
    },
    feedbackMsg: {
        padding: 5,
        textAlign: "center"
    },
    erroBoxText: {
        color: '#D00'
    }
});

