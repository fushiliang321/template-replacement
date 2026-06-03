import replace from '../common/general'
import init from './base'

replace({}).then((r) => {
  init(r)
})
export default {}
