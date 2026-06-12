import type { signFun } from '../../../types/options';
import ReplaceInterface from '../../replace/interface';
import { rawCoreInterface } from '../../core/base';
declare const _default: (buffer: BufferSource, replace: new (core: rawCoreInterface) => ReplaceInterface, core: (buffer: BufferSource) => rawCoreInterface, sign?: signFun) => ReplaceInterface;
export default _default;
