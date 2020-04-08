import React from 'react';
import { Button, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import styles from './styles/base.style';
import NavigationBar from './components/navigationBar';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, isMountedRef, navigationChange  } from './services/navigationService';




function App() {
    React.useEffect(() => {
        isMountedRef.current = true;

        return () => (isMountedRef.current = false);
    }, []);
    return (
        <NavigationContainer ref={navigationRef} onStateChange={(e) => navigationChange(e)}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.container}>
                <Image source={require('./assets/images/background.png')} resizeMode={'repeat'} style={[styles.backgroundBanner]} />
                <NavigationBar />
            </View>
        </NavigationContainer>
    );
}

export default App;
