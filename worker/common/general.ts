import Replace from '../../replace/general'
import ReplaceInterface from '../../replace/interface'
import core from '../../core/general'

export default async (): Promise<ReplaceInterface> => {
  return new Replace(await core())
}
