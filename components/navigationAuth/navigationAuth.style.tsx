import { StyleSheet, PixelRatio } from 'react-native';
import Layout from '../../constants/Layout';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
        alignContent: 'center',
        justifyContent: 'center',
    },
    navcontainer: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    gridmenu: {
        height: PixelRatio.getPixelSizeForLayoutSize(20),
        flexDirection: 'row',
        backgroundColor: '#333333',
        alignItems: 'stretch',
        alignContent: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    iconButton: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    menuButtonMock: {
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        zIndex: 100
    },
    menuButton: {
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        backgroundColor: '#FFF',
        borderColor: '#666',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(30),
        zIndex: 100
    },
    menuButtonArea: {
        position: "absolute",
        bottom: 10,
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        zIndex: 1000
    },
    closeIcon: {
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        position: "absolute",
        top: 15,
        left: 0,
        bottom: 0,
        right: 0,
        margin: 'auto',
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '45deg' }],
        zIndex: 100
    },
    closeBt: {
        fontSize: 40,
        color: '#FFF'
    },
    menu: {
        width: Layout.window.width,
        height: PixelRatio.getPixelSizeForLayoutSize(120),
        backgroundColor: '#666',
        position: "absolute",
        bottom: 0,
        overflow: 'hidden',
        zIndex: 10,
        paddingBottom: PixelRatio.getPixelSizeForLayoutSize(20)
    },
    menuGrid: {
        width: Layout.window.width,
    },
    menuItem: {
        width: Layout.window.width / 4 - 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemIcon: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 10,
    },
    menuLabel: {
        color: '#FFF',
        fontSize: 12,
        textAlign: "center"
    }
});

