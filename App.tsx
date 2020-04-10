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



function App(props: any) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [isAppReady, setAppReady] = useState(false);
    const [isloading, setloading] = useState(false);
    const [isAuth, setAuth] = useState(false);
    React.useEffect(() => {
        isMountedRef.current = true;
        DeviceEventEmitter.addListener('setUser', (data) => {
            console.log("data: ", data);
            setAuth(data);
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
                autoHideSplash={false}
            />
        );

    }
    if (!isAppReady) {
        return (
            <View style={{ flex: 1 }}>
                <Image source={require('./assets/images/background.png')} resizeMode={'repeat'} style={[styles.backgroundBanner]} />
                <Image
                    source={require('./assets/images/splash.png')}
                    onLoadEnd={_cacheResourcesAsync(setAppReady)}
                    fadeDuration={0}
                />
            </View>
        );
    }

    return (

        <NavigationContainer ref={navigationRef} onStateChange={(e) => navigationChange(e)}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.container}>
                <Image source={require('./assets/images/background.png')} resizeMode={'repeat'} style={[styles.backgroundBanner]} />
                {isAuth
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

async function _cacheResourcesAsync(setAppReady: any) {
    SplashScreen.hide();
    const images = [
        require('./assets/images/icon.png'),
    ];

    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    setAppReady(true);
};
async function loadResourcesAsync() {
}
function handleFinishLoading(setLoadingComplete: any) {
    
    setTimeout(function () { setLoadingComplete(true) }, 10000)
}
function handleLoadingError(error: Error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}
export default App;
