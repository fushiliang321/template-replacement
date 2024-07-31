export default class urlTaskItem {
    url: string
    name: string

    constructor(url: string, name?: string) {
        this.url = url
        if (name) {
            this.name = name
        } else {
            this.name = url.split("/").pop() ?? ''
        }
    }
}