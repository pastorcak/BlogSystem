export class User {
    constructor (
        public name: string,
        public password: string
    ) { }

    toString () {
        var json = this.toJson();
        return JSON.stringify(json);
    }

    toJson () {
        return {
            name: this.name,
            password: this.password
        };
    }

    static fromString (user) {
        var json = JSON.parse(user);
        if (json.name && json.password) {
            return new User(json.name, json.password);
        } else {
            throw Error('Wrong object, expecting User (user.model.ts)');
        }
    }
}