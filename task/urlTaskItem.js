export default class urlTaskItem{
    url
    name

    constructor(url, name) {
        this.url = url
        if (name) {
            this.name = name
        }else{
            this.name = url.split("/").pop()
        }
    }
}