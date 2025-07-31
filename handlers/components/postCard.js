export class PostCard{
    constructor(post){
        this.post = post;
    }

    render(){
        const div = document.createElement("div");
        div.classList.add("post-container");
        div.id = this.post.id;
        div.innerHTML = `<div class="post-info">
                            <img class="userpic" src="${this.post.display_pic}" alt="Profile Picture">
                            <p class="username">@${this.post.username}</p>
                        </div>
                        <div class="post-content">
                            ${this.post.caption ? `<p class="caption">${this.post.caption}</p>` : ''}
                            ${this.post.images ? `<img class="post-image" src="${this.post.images}" alt="Post Image">` : ''}
                            <div class="post-buttons">
                                <button type="button">Like</button>
                                <button type="button">Comment</button>
                                <button type="button">Share</button>
                            </div>
                        </div>`;
        return div;
    }
}