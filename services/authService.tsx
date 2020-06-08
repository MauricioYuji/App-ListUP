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
export function signIn(email: string, fullname: string, password: string) {

    const user = {
        password: password,
        fullname: fullname,
        email: email
    };
    //console.log("POST LOGIN");
    return post("/user/add", user);

}

export function confirmEmail(email: string) {

    const user = {
        email: email
    };
    //console.log("POST LOGIN");
    return post("/sendconfirm/", user);

}
export function forgetpassword(email: string) {

    const user = {
        email: email
    };
    //console.log("POST LOGIN");
    return post("/resetpassword/", user);

}