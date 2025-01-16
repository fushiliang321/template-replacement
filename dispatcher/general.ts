import ReplaceInterface from '../replace/interface'
import replace from '../dist/replace/general'

export default (): ReplaceInterface => {
    return new replace()
}
