import {Component} from 'angular2/core';
import {AuthService} from "../service/auth.service";
import {User} from "../model/user.model";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {NgForm} from 'angular2/common';

@Component({
    selector: 'div',
    templateUrl: "app/view/login.component.html",
    directives: [ROUTER_DIRECTIVES],
})

export class LoginComponent {
    public model = new User('', '');

    constructor (
        private _authService: AuthService,
        private _router: Router
    ) { }

    /***
     * Login given user, navigate to 'List' route in case of success
     * @param user
     */
    login (user: User) {
        var self = this;
        this._authService.loginUser(user).then(function (result) {
            self._router.navigate( ['List'] );
        });
    }
}