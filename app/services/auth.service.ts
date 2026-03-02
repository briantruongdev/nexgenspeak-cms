import BaseService from './base.service'
import type { IFormLogin } from '~/schemas/auth.schema'
import type { IResponseLogin } from '~/types/auth.type'

export class AuthService extends BaseService {
  constructor() {
    super('')
  }

  async login(form: IFormLogin): Promise<IResponseLogin> {
    return this.post<IResponseLogin>('/login', form)
  }
}
