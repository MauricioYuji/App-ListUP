import { StyleSheet } from 'react-native';
import Layout from '~/constants/Layout'


export default StyleSheet.create({
    button: {
        backgroundColor: '#006CD8',
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSecondary: {
        backgroundColor: '#444444',
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDisabled: {
        backgroundColor: '#444',
        opacity: 1,
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonFacebook: {
        flexDirection: 'row',
        backgroundColor: '#3A559F',
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonFacebookDisabled: {
        flexDirection: 'row',
        backgroundColor: '#444444',
        borderRadius: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    facebooklogo: {
        marginRight: 20,
        marginLeft: -10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'SourceSansPro-Bold',
    },
    buttonTextDisabled: {
        color: '#555',
        fontSize: 16,
        fontFamily: 'SourceSansPro-Bold',
    },
    clickArea: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    loadingIcon: {
        position: "absolute",
        marginHorizontal: 30,
        marginVertical: 15
    },
    hiddenButton: {
        opacity: 0
    }
});