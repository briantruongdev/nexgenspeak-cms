import type { MyScheduleResponse } from '~/types/teacher.type'
import BaseService from './base.service'

export class CmsTeacherService extends BaseService {
  constructor() {
    super('/teacher')
  }

  async getMySchedule(startDate: string, endDate: string): Promise<MyScheduleResponse> {
    return this.get<MyScheduleResponse>('/schedule', { startDate, endDate })
  }
}
