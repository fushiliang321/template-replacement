import ReplaceInterface from '../replace/interface'
import replace from '../replace/sign'
// import replace from '../dist/replace/sign'

export default (): ReplaceInterface => {
  return new replace()
}
