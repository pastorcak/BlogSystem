import {Component} from 'angular2/core';
import {RouteConfig, Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {BlogService} from "./service/blog.service";
import {ListComponent} from "./view/list.component";
import {BlogDetailComponent} from "./view/blog-detail.component";
import {LoginComponent} from "./view/login.component";
import {AuthService} from "./service/auth.service";
import {CORE_DIRECTIVES} from "angular2/common";
import {BlogEditComponent} from "./view/blog-edit.component";

@Component({
    selector: 'blog-app',
    templateUrl: "app/app.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [BlogService, AuthService]
})

@RouteConfig([

    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/',
        name: 'List',
        component: ListComponent
    },
    {
        path: '/:id',
        name: 'BlogDetail',
        component: BlogDetailComponent
    },
    {
        path: '/create',
        name: 'BlogCreate',
        component: BlogEditComponent
    },
    {
        path: '/:id/edit',
        name: 'BlogEdit',
        component: BlogEditComponent
    }
])
export class AppComponent {

    constructor (
        private _router: Router,
        private _auth: AuthService
    ) {}

    /***
     * check if we are on login page right now
     * @returns {boolean}
     */
    isLoginPageActive () {
        return this._router.isRouteActive(this._router.generate(['Login']));
    }

    /***
     * check if user is authorized
     * @returns {boolean}
     */
    isUserAuthorized () {
        return this._auth.isUserAuthenticated();
    }

    /***
     * Return logged user name if authorized, empty string in other case
     * @returns {string}
     */
    getUserName () {
        var user = this._auth.getUser();
        if (user !== null) {
            return user.name;
        } else {
            return '';
        }
    }

    /***
     * call to logout authorized user
     */
    logout () {
        this._auth.logout().then(() => {
            this._router.navigate( ['List'] );
        });
    }
}
