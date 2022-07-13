import { applyMixins } from '../../../utils/index.js'
import { WebAPI } from '../../WebAPI.js'
import { GetRegion } from './GetRegion.js'
import { Login } from './Login.js'

export class User {
    constructor(protected readonly root: WebAPI) {}
}

export interface User extends GetRegion, Login {}

applyMixins(User,[GetRegion,Login])
