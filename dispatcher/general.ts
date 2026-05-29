import ReplaceInterface from '../replace/interface'
import replace from '../replace/general'
// import replace from '../dist/replace/general'

export default (): ReplaceInterface => {
  return new replace()
}
