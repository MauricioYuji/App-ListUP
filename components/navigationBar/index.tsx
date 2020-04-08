import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Animated, TouchableHighlight, TouchableWithoutFeedback, PixelRatio, ScrollView, DeviceEventEmitter } from 'react-native';
import styles from './navigationBar.style';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../../services/navigationService';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Layout from '../../constants/Layout';
import Icon from '../../components/icon';
import Screens from '../../constants/Screens';



//const Pages = createStackNavigator();
const Pages = createMaterialTopTabNavigator();

const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                    //{
                    //    rotate: current.progress.interpolate({
                    //        inputRange: [0, 1],
                    //        outputRange: [1, 0],
                    //    }),
                    //},
                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        };
    },
}


function MyStack() {
    return (
        <Pages.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...MyTransition,
            }}
            tabBar={tab => null}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            headerMode='none'>
            {Screens.map(({ component, icon, params, route, tabBar }, index) =>
                <Pages.Screen
                    name={route}
                    component={component}
                    key={index}
                />
            )}
        </Pages.Navigator>
    );
}



export default class navigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRoute: "Feed",
        };
    }
    componentDidMount() {

        DeviceEventEmitter.addListener('currentRoute', (data) => {
            this.setState({ currentRoute: data }, () => {
            });
        });
    }

    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.parallel([
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                duration: 300
            })
        ]).start(() => {
            // callback
        });
    };

    createIcon(route: string, params: any, name: string) {
        return (
            <TouchableHighlight underlayColor="transparent" onPress={() => navigate(route, params)}>
                <Icon
                    size={32}
                    name={name}
                    type='FontAwesome'
                    focused={this.state.currentRoute == route}
                />
            </TouchableHighlight>
        );
    }
    createMenuIcon(label: any, icon: any, font: any, func: Function) {
        return (
            <TouchableHighlight style={styles.menuItem} underlayColor="transparent" onPress={func}>
                <View style={styles.menuItem}>
                    <Icon
                        size={26}
                        name={icon}
                        type={font}
                        style={styles.menuItemIcon}
                        focused={false}
                    />
                    <Text style={styles.menuLabel}>{label}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const radius = this.mode.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [600, 600, 0]
        });
        const width = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [50, Layout.window.width]
        });
        const height = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 60 * 5]
        });
        const menuPos = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 0]
        });
        const opacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });
        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '225deg']
        });
        const invertedopacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const invertedrotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '315deg']
        });
        const screenLeft = Screens.slice(0, Screens.length / 2)
        const screenRight = Screens.slice(Screens.length / 2, Screens.length);
        return (
            <View style={styles.container}>
                <MyStack />

                <View style={styles.navcontainer}>
                    <View style={styles.gridmenu} >
                        {screenLeft.map((data, index) =>
                            <View style={styles.icon} key={index}>
                                {this.createIcon(data.route, data.params, data.icon)}
                            </View>
                        )}
                        <View style={styles.menuButtonMock}></View>
                        {screenRight.map((data, index) =>
                            <View style={styles.icon} key={index}>
                                {this.createIcon(data.route, data.params, data.icon)}
                            </View>
                        )}
                    </View>

                    <TouchableHighlight
                        style={styles.menuButtonArea}
                        underlayColor="transparent"
                        onPress={this.toggleView}>
                        <View>
                            <Animated.View style={[styles.menuButton, {
                                opacity,
                                transform: [
                                    { rotate: rotation }
                                ]
                            }]}>
                                <Image source={require('../../assets/images/icon.png')} resizeMode="contain" style={styles.iconButton} />
                            </Animated.View>
                            <Animated.View style={[styles.closeIcon, {
                                opacity: invertedopacity,
                                transform: [
                                    { rotate: invertedrotation }
                                ]
                            }]}><Text style={styles.closeBt}>+</Text></Animated.View>

                        </View>
                    </TouchableHighlight>
                    <Animated.View style={[styles.menu, {
                        width,
                        height,
                        borderRadius: radius,
                        bottom: menuPos
                    }]}
                        onStartShouldSetResponder={evt => {
                            evt.persist();
                            console.log('Tapped outside');
                        }}
                    >
                        <ScrollView style={styles.menuGrid} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.createMenuIcon('My Games', 'gamepad-variant', 'MaterialCommunityIcons', () => navigate('Feed', {}))}
                            {this.createMenuIcon('Fav List', 'format-list-bulleted-type', 'MaterialCommunityIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                            {this.createMenuIcon('Criar lista', 'playlist-add', 'MaterialIcons', () => navigate('Games', {}))}
                        </ScrollView>
                        <ScrollView style={styles.menuGrid} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.createMenuIcon('Random Game', 'dice-5', 'MaterialCommunityIcons', () => navigate('Tutorial', {}))}
                            {this.createMenuIcon('Game Reviews', 'star', 'FontAwesome', () => navigate('Tutorial', {}))}
                            {this.createMenuIcon('Game Match', 'cards-outline', 'MaterialCommunityIcons', () => navigate('Tutorial', {}))}
                        </ScrollView>
                        <ScrollView style={styles.menuGrid} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.createMenuIcon('Tutorial', 'book', 'Octicons', () => navigate('Tutorial', {}))}
                            {this.createMenuIcon('Configurações', 'gear', 'FontAwesome', () => navigate('Configuracoes', {}))}
                            {this.createMenuIcon('Logout', 'logout', 'MaterialCommunityIcons', () => navigate('logoff', {}))}
                        </ScrollView>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

