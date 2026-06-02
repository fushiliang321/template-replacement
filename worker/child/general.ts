import Replace from '../../replace/general'
import init from './base'

const replace = new Replace()
replace.init().then(() => {
  init(replace)
})
