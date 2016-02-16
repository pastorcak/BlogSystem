import {User} from "../../app/model/user.model";

describe('User', () => {
    it('has name and password given in the constructor', () => {
        let user = new User('name', 'password');
        expect(user.name).toEqual('name');
        expect(user.password).toEqual('password');
    });

    it('test toJson method', () => {
        let user = new User('name', 'password');
        var json = {
            name: 'name',
            password: 'password'
        };
        expect(user.toJson()).toEqual(json);
    });

    it('test toString method', () => {
        let user = new User('name', 'password');
        var string = '{"name":"name","password":"password"}';
        expect(user.toString()).toEqual(string);
    });

    it('test fromString method', () => {
        var string = '{"name":"name","password":"password"}';
        let user = User.fromString(string);
        expect(user.name).toEqual('name');
        expect(user.password).toEqual('password');
    });
});