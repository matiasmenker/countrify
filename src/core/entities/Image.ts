class Image {
    readonly url: string;
    readonly preloadUrl: string;
    readonly description: string;

    constructor(url: string, preloadUrl: string, description: string) {
        this.url = url;
        this.preloadUrl = preloadUrl;
        this.description = description;
    }
}

export default Image;
