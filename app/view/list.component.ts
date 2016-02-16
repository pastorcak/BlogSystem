import {Component} from 'angular2/core';
import {BlogItem} from "../model/blog-item.model";
import {BlogService} from "../service/blog.service";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {AuthService} from "../service/auth.service";

@Component({
    selector: 'div',
    templateUrl: "app/view/list.component.html",
})

export class ListComponent implements OnInit {
    public blogList: BlogItem[];
    public selectedBlogItem: BlogItem;

    constructor(
        private _blogService: BlogService,
        private _router: Router,
        private _auth: AuthService
    ) { }

    ngOnInit() {
        this.getBlogItems();
    }

    /***
     * check if user is authorized
     * @returns {boolean}
     */
    isUserAuthorized () {
        return this._auth.isUserAuthenticated();
    }

    /***
     * Select blog item and go to it's detail
     * @param entry
     */
    onSelect(entry: BlogItem) {
        this.selectedBlogItem = entry;
        this._router.navigate( ['BlogDetail', {id: entry.id}] );
    }

    /***
     * Fetch list of blog items from BlogService
     */
    getBlogItems() {
        var self = this;
        this._blogService.getListOfBlogs().then(function (list: BlogItem[]) {
            self.blogList = list;
        });
    }

    /***
     * Navigate to 'BlogCreate' page
     */
    createBlogItem () {
        this._router.navigate(['BlogCreate']);
    }

    /***
     * Navigate to 'BlogEdit' page with given blog item ID
     * @param id
     */
    editItem (id) {
        this._router.navigate(['BlogEdit', {id: id}]);
    }

    /***
     * Delete blog item with given ID
     * @param id
     */
    deleteItem (id) {
        if (window.confirm("Do you really want to leave?")) {
            this._blogService.deleteBlogItem(id).then(() => {
                this.getBlogItems();
            });
        }
    }
}
