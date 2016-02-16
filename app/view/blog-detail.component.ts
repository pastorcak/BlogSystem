import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {BlogService} from "../service/blog.service";
import {BlogItem} from "../model/blog-item.model";
import {AuthService} from "../service/auth.service";

@Component({
    selector: 'div',
    templateUrl: "app/view/blog-detail.component.html",
    directives: [ROUTER_DIRECTIVES],
})

export class BlogDetailComponent {
    public blogItem = new BlogItem(1, '', '', new Date());
    public wrongId = false;

    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _blogService: BlogService,
        private _auth: AuthService
    ) {}

    ngOnInit() {
        let id = this._routeParams.get('id');
        var self = this;
        this._blogService.getBlogItem(id).then(function (blogItem) {
            if (blogItem == null) {
                self.wrongId = true;
            } else {
                self.blogItem = blogItem;
            }
        });
    }

    /***
     * check if user is authorized
     * @returns {boolean}
     */
    isUserAuthorized () {
        return this._auth.isUserAuthenticated();
    }

    /***
     * Navigate to 'BlogEdit' page with given blog item ID
     * @param id
     */
    editItem (id) {
        this._router.navigate(['BlogEdit', {id: id}]);
    }

    /***
     * Navigate to 'BlogCreate' page
     */
    createBlogItem () {
        this._router.navigate(['BlogCreate']);
    }

    /***
     * Delete blog item with given ID
     * @param id
     */
    deleteItem (id) {
        if (window.confirm("Do you really want to delete this item?")) {
            this._blogService.deleteBlogItem(id).then(() => {
                this._router.navigate(['List']);
            });
        }
    }
}
