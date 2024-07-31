import excelTemp from "./excelTemp"
import wordTemp from "./wordTemp"
import unknownTemp from "./unknownTemp"
import { TempInterface } from "./index.d"
import { fileType, fileTypes } from "../helper/index"

export default class temp {
    _instance: TempInterface

    constructor(file: File) {
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

    getInstance(): TempInterface {
        return this._instance
    }
}