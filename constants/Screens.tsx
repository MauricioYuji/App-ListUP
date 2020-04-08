
import Feed from '../views/feed';
import Games from '../views/games';
import Groups from '../views/groups';
import Profile from '../views/profile';

export default [
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
