import {BLOGITEMS} from './blog.items';
import {Injectable} from 'angular2/core';
import {BlogItem} from "../model/blog-item.model";

/***
 * Blog Item Serivice
 * should fetch data from REST API, we mock real server with JSON in BLOGITEMS.
 * All methods return Promise to simulate async calls of service
 */
@Injectable()
export class BlogService {
    /***
     * List all blog items - TODO: missing paging
     * @returns {Promise<BlogItem[]>}
     */
    getListOfBlogs() {
        var items: BlogItem[] = [];
        BLOGITEMS.forEach((item) => {
            items.push(BlogItem.fromJson(item));
        });
        return Promise.resolve(items);
    }

    /***
     * Get Blog Item detail
     * @param id
     * @returns {Promise<T>}
     */
    getBlogItem(id) {
        var blogItem: BlogItem;
        BLOGITEMS.forEach(function (item) {
           if (item.id === +id) {
               blogItem = BlogItem.fromJson(item);
           }
        });
        return Promise.resolve(blogItem);
    }

    /***
     * Create new BLog Item
     * @param blogItem
     * @returns {Promise<BlogItem>}
     */
    addBlogItem (blogItem: BlogItem) {
        // generate item ID
        blogItem.id = Math.floor(Math.random() * (10000));
        BLOGITEMS.push(blogItem.toJson());
        return Promise.resolve(blogItem);
    }

    /***
     * Update BLog Item
     * @param blogItem
     * @returns {Promise<T>}
     */
    updateBlogItem (blogItem: BlogItem) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var toUpdate;
            BLOGITEMS.forEach(function (item) {
                if (item.id === blogItem.id) {
                    toUpdate = item;
                }
            });
            if (toUpdate) {
                BLOGITEMS.splice(BLOGITEMS.indexOf(toUpdate), 1, blogItem.toJson());
                resolve(blogItem);
            }
        });
    }

    /***
     * Delete Blog Item
     * @param id
     * @returns {Promise<T>}
     */
    deleteBlogItem (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var toDelete;
            BLOGITEMS.forEach(function (item) {
                if (item.id === +id) {
                    toDelete = item;
                }
            });
            if (toDelete) {
                BLOGITEMS.splice(BLOGITEMS.indexOf(toDelete), 1);
                resolve('ok');
            }
        });
    }
}