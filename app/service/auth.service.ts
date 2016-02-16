import {Injectable} from 'angular2/core';
import {User} from "../model/user.model";

/***
 * Auth Service
 * Should authorize user against REST API
 * In our case, we only store user data in localStorage
 * Methods which "calling" REST API return promise to simulate async call
 */
@Injectable()
export class AuthService {
    /***
     * Is User already authenticated
     * in real world, we should have auth token, session, etc.
     * @returns {boolean}
     */
    isUserAuthenticated () {
        var user = localStorage.getItem('authUser');
        return user !== null;
    }

    /***
     * Get Login User Name
     * @returns {any}
     */
    getUser () {
        var user = localStorage.getItem('authUser');
        if (user === null) {
            return null;
        } else {
            return User.fromString(user);
        }
    }

    /***
     * Call REST API to login user
     * @param user
     * @returns {Promise<User>}
     */
    loginUser (user: User) {
        localStorage.setItem('authUser', user.toString());
        return Promise.resolve(user);
    }

    /***
     * Logout user
     * @returns {Promise<string>}
     */
    logout () {
        localStorage.removeItem('authUser');
        return Promise.resolve('ok');
    }
}