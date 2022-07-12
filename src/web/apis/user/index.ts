import { applyMixins } from '../../../utils'
import { WebAPI } from '../../WebAPI'
import { GetRegion } from './GetRegion'

export class User {
    constructor(protected readonly root: WebAPI) {}
}

export interface User extends GetRegion {}

applyMixins(User,[GetRegion])
