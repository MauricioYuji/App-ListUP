
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import ForgetPassword from '../views/auth/forgetpassword';

export default [
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
