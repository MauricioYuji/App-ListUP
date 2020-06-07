import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, StatusBar, Image, DeviceEventEmitter, Modal, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles/base.style';
import NavigationBar from './components/navigationBar';
import NavigationAuth from './components/navigationAuth';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { navigationRef, isMountedRef, navigationChange, navigate } from './services/navigationService';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native'



function App(props: any) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [isAppReady, setAppReady] = useState(false);
    const [isloading, setloading] = useState(false);
    const [isAuth, setAuth] = useState(null);
    React.useEffect(() => {
        AsyncStorage.getItem('USER', (err, result) => {
            console.log(result);
            if (result != null) {
                setAuth(JSON.parse(result));
            }
        });

        isMountedRef.current = true;
        DeviceEventEmitter.addListener('setUser', (data) => {
            console.log("data: ", data);
            setAuth(data);
            AsyncStorage.setItem(
                'USER',
                JSON.stringify(data)
            );
        });
        DeviceEventEmitter.addListener('loading', (data) => {
            setloading(data);
        });


        return () => (isMountedRef.current = false);
    }, []);


    if (!isLoadingComplete) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
                autoHideSplash={true}
            />
        );

    }

    return (

        <NavigationContainer ref={navigationRef} onStateChange={(e) => navigationChange(e)}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.container}>
                <Image source={require('./assets/images/background.png')} resizeMode={'repeat'} style={[styles.backgroundBanner]} />
                {isAuth != null
                    ? <NavigationBar />
                    : <NavigationAuth />
                }
            </View>

            {isloading &&
                <Modal
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.backgroundModal}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                </Modal>
            }
        </NavigationContainer>

    );


}

async function _cacheResourcesAsync<Function>(setAppReady: any) {
    SplashScreen.hide();
};
async function loadResourcesAsync() {
    const images = [
        require('./assets/images/icon.png'),
        require('./assets/images/logo-icon.png'),
    ];
    const fonts = {
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'SourceSansPro-Black': require('./assets/fonts/SourceSansPro-Black.ttf'),
        'SourceSansPro-BlackItalic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
        'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
        'SourceSansPro-BoldItalic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
        'SourceSansPro-ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
        'SourceSansPro-ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
        'SourceSansPro-Italic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
        'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
        'SourceSansPro-LightItalic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
        'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
        'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
        'SourceSansPro-SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf')
    };

    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });
    await Font.loadAsync(fonts);
    await Promise.all(cacheImages);
    //setAppReady(true);
}
function handleFinishLoading(setLoadingComplete: any) {
    console.log("LOAD COMPLETE");
    setLoadingComplete(true)
    //setTimeout(function () { setLoadingComplete(true) }, 10000)
}
function handleLoadingError(error: Error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}
export default App;
