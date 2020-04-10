import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Animated, TouchableHighlight, TouchableWithoutFeedback, PixelRatio, ScrollView, DeviceEventEmitter } from 'react-native';
import styles from './navigationAuth.style';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../../services/navigationService';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthScreens } from '../../constants/Screens';



const Pages = createMaterialTopTabNavigator();

function MyPages() {
    return (
        <Pages.Navigator
            swipeEnabled={false}
            tabBar={tab => null}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            headerMode='none'>
            {AuthScreens.map(({ component, params, route }, index) =>
                <Pages.Screen
                    name={route}
                    component={component}
                    key={index}
                />
            )}
        </Pages.Navigator>
    );
}



export default class navigationAuth extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <MyPages />
            </View>
        );
    }
}

