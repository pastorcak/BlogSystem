export class BlogItem {
    constructor (
        public id: number,
        public title: string,
        public body: string,
        public created: Date
    ) { }

    formatDate () {
        var yyyy = this.created.getFullYear().toString();
        var mm = (this.created.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.created.getDate().toString();
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
    }

    toJson () {
        return {
            id: this.id,
            title: this.title,
            body: this.body,
            created: this.formatDate()
        };
    }

    static fromJson (blogItem) {
        if (blogItem.id && blogItem.title && blogItem.body && blogItem.created) {
            return new BlogItem(blogItem.id, blogItem.title, blogItem.body, new Date(blogItem.created));
        } else {
            throw Error('Wrong object, expecting BlogItem (blog-item.model.ts)');
        }
    }
}