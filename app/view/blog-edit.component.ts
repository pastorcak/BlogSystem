import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {BlogService} from "../service/blog.service";
import {BlogItem} from "../model/blog-item.model";

@Component({
    selector: 'div',
    templateUrl: "app/view/blog-edit.component.html",
    directives: [ROUTER_DIRECTIVES],
})

export class BlogEditComponent {
    public model = new BlogItem(1, '', '', new Date());
    public createdDate = this.model.formatDate();
    public saveLabel = 'Create';
    public createMode = true;
    public wrongId = false;

    constructor(
        private _router: Router,
        private _routeParams:RouteParams,
        private _blogService: BlogService
    ) {}

    ngOnInit() {
        // try to fetch id from RouteParam
        let id = this._routeParams.get('id');
        if (id !== null) {
            // we have ID, we need to fetch blog item from service
            this.createMode = false;
            this.saveLabel = 'Save';
            var self = this;
            this._blogService.getBlogItem(id).then(function (item) {
                if (item == null) {
                    self.wrongId = true;
                } else {
                    self.model = item;
                    self.createdDate = item.formatDate();
                }
            });
        }
    }

    /***
     * Create or Update blog item, depends on component mode
     * @param form
     */
    save (form) {
        var self = this;
        this.model.created = new Date(this.createdDate);
        if (this.createMode) {
            this._blogService.addBlogItem(this.model).then(function (result: BlogItem) {
                self._router.navigate(['BlogDetail', {id: result.id}]);
            });
        } else {
            this._blogService.updateBlogItem(this.model).then(function (result: BlogItem) {
                self._router.navigate(['BlogDetail', {id: result.id}]);
            });
        }
    }
}
