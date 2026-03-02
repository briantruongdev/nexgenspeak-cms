export interface IStudent {
  userId: string
  email: string
  phone: string
  fullName: string
  slotAvailablePerDay: string
  expirationDate: string
  createdAt: string
}
export enum ScheduleStatus {
  COMPLETED = 'completed',
  UPCOMING = 'upcoming',
  TODAY = 'today'
}
export interface IResponseStudent {
  students: IStudent[]
  total: number
}
export interface StudentScheduleSlot {
  registrationId: string
  date: string
  slotId: number
  startTime: string
  endTime: string
  teacherId: string
  teacherName: string
  teacherPosition: string
  status: ScheduleStatus
}
export interface StudentSchedule {
  completed: StudentScheduleSlot[]
  upcoming: StudentScheduleSlot[]
  today: StudentScheduleSlot[]
}
export interface ScheduleSummary {
  totalCompletedSlots: number
  totalUpcomingSlots: number
  totalTodaySlots: number
  totalCompletedHours: number
  totalUpcomingHours: number
  totalTodayHours: number
}
export interface StudentScheduleResponse {
  student: {
    userId: string
    email: string
    slotAvailablePerDay: number
    expirationDate: string | null
  }
  schedule: StudentSchedule
  summary: ScheduleSummary
}
