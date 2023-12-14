import excelTemp from "./excelTemp"
import wordTemp from "./wordTemp"
import unknownTemp from "./unknownTemp"
import { fileType, fileTypes } from "../helper/index.js"

export default class temp {
    _instance

    constructor(file) {
        switch (fileType(file)) {
            case fileTypes.word:
                this._instance = new wordTemp(file)
                break;
            case fileTypes.excel:
                this._instance = new excelTemp(file)
                break;
            default:
                this._instance = new unknownTemp(file)
                break;
        }
    }

    getInstance() {
        return this._instance
    }
}