import * as React from 'react';
import { DeviceEventEmitter } from 'react-native';

export function Logout() {
    DeviceEventEmitter.emit('hideNav', true);
    DeviceEventEmitter.emit('setUser', null);
}