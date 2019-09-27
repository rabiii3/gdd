import APP from './app';
import LANDING from './landing';
import LOGIN from './login';
import ADMIN from './admin';
import REGISTER from './register';

export default mode => ({ APP, LANDING, LOGIN, ADMIN, REGISTER }[mode]);
