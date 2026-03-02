import type { IResponseStudent, StudentScheduleResponse } from '~/types/student.type'
import BaseService from './base.service'

export class StudentService extends BaseService {
  constructor() {
    super('/admin/students')
  }

  async getAllStudents(): Promise<IResponseStudent> {
    return this.get<IResponseStudent>('')
  }

  async getScheduleById(studentId: string): Promise<StudentScheduleResponse> {
    return this.get<StudentScheduleResponse>(`/${studentId}/schedule`)
  }
}
