import replace from '../../common/polyfill/general'
import init from '../base'

replace().then(r => {
  init(r)
})
export default {}
