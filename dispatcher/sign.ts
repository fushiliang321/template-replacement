import ReplaceInterface from '../replace/interface'
import replace from '../dist/replace/sign'

export default (): ReplaceInterface => {
  return new replace()
}
