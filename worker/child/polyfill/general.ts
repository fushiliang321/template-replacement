import replace from '../../common/general'
import init from '../base'

replace({
  polyfill: true,
}).then((r) => {
  init(r)
})
export default {}
