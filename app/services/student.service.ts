import type { IResponseStudent } from '~/types/student.type'
import BaseService from './base.service'

export class StudentService extends BaseService {
  constructor() {
    super('/admin/students')
  }

  async getAllStudents(): Promise<IResponseStudent> {
    return this.get<IResponseStudent>('')
  }
}
