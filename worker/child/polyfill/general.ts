import Replace from '../../../replace/generalPolyfill'
import init from '../base'

const replace = new Replace()
replace.init().then(() => {
  init(replace)
})
export default {}
