
import Feed from '../views/pages/feed';
import Games from '../views/pages/games';
import Groups from '../views/pages/groups';
import Profile from '../views/pages/profile';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import ForgetPassword from '../views/auth/forgetpassword';

export const Screens = [
    {
        component: Feed,
        route: 'Feed',
        params: {},
        icon: 'list-alt',
        tabBar: true,
        default: true
    },
    {
        component: Games,
        route: 'Games',
        params: {},
        icon: 'gamepad',
        tabBar: true
    },
    {
        component: Groups,
        route: 'Groups',
        params: {},
        icon: 'users',
        tabBar: true
    },
    {
        component: Profile,
        route: 'Profile',
        params: {},
        icon: 'user',
        tabBar: true
    }
];


export const AuthScreens = [
    {
        component: Login,
        route: 'Login',
        params: {}
    },
    {
        component: Register,
        route: 'Register',
        params: {}
    },
    {
        component: ForgetPassword,
        route: 'ForgetPassword',
        params: {}
    },
];
