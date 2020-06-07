import * as React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { post, get } from '~/services/baseService';

export function Logout() {
    DeviceEventEmitter.emit('hideNav', true);
    DeviceEventEmitter.emit('setUser', null);
}
export function logIn(email: string, password: string) {

    const user = {
        password: password,
        username: email
    };
    //console.log("POST LOGIN");
    return post("/login/", user);

}