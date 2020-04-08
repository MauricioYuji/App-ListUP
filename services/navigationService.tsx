import * as React from 'react';
import { DeviceEventEmitter } from 'react-native';


export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name: any, params: any) {
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
        DeviceEventEmitter.emit('currentRoute', name);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function navigationChange(e) {
    if (e.history != undefined) {
        let current = e.history.slice(-1).pop();
        let rota = e.routes.find((p: { key: any; }) => p.key == current.key).name;
        DeviceEventEmitter.emit('currentRoute', rota);
    }
}