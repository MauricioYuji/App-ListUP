import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';
import { post } from '~/services/baseService';

export async function logInWithFacebook(register: boolean) {
    try {
        const appId = Constants.manifest.extra.facebook.appId;
        await Facebook.initializeAsync(appId);
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
            //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            const obj = await response.json();
            const user = {
                password: obj.id,
                fullname: obj.name,
                email: obj.email,
                photoURL: 'http://graph.facebook.com/' + obj.id + '/picture?type=square',
                isfacebook: true
            };

            //console.log("user: ", user);
            if (register) {
                return post("/signinwithfacebook/", user);
            } else {

                return post("/loginwithfacebook/", user);
            }
        } else {
            // type === 'cancel'
            return Promise.reject({ type: 'cancel' });
        }
    } catch ({ message }) {
        //alert(`Facebook Login Error: ${message}`);
    }
}


//export async function signInWithFacebook() {
//    const appId = Constants.manifest.extra.facebook.appId;
//    const permissions = ['public_profile', 'email'];



//    const {
//        type,
//        token
//    } = await Facebook.logInWithReadPermissionsAsync(
//        appId,
//        { permissions }
//    );
//    switch (type) {
//        case 'success': {

//            console.log('Logged in!', token);
//            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
//            var obj = await response.json();
//            console.log('Logged in!', obj);
//            console.log('http://graph.facebook.com/' + obj.id + '/picture?type=square');
//            var user = {
//                password: obj.id,
//                fullname: obj.name,
//                email: obj.email,
//                photoURL: 'http://graph.facebook.com/' + obj.id + '/picture?type=square',
//                isfacebook: true
//            };
//            console.log("user: ", user);



//            return post("/signinwithfacebook/", user);
//        }
//        case 'cancel': {
//            return Promise.reject({ type: 'cancel' });
//        }
//    }
//}