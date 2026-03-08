export interface ITeacher {
  teacherId: string
  fullName: string
  position: string
  award1: string
  award2: string
  award3: string
  avatar: string
  rating: number
  totalReviews: number
  students: number
  lessons: number
  pricePerHour: number
  languages: string[]
  aboutMe: string
  strengths: string
  teachingStyle: string
  resume: [{ time: string; value: string }]
  specialties: [
    {
      title: string
      description: string
    }
  ]
  isFavorite?: boolean
}

export interface IResponseTeachers {
  teachers: ITeacher[]
  total: number
}

export interface IResponseSlots {
  teacherId: number
  teacherName: string
  date: string
  slots: ISlots[]
}

export interface ISlots {
  id: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface IToggleFavoriteResponse {
  success: boolean
  message: string
  data: {
    favoriteTeachers: number[]
  }
}
export interface ScheduleSlot {
  registrationId: string
  date: string
  slotId: number
  startTime: string
  endTime: string
  studentId: string
  studentEmail: string
  studentPhone: string
  status: 'completed' | 'upcoming' | 'today'
}
export interface TeacherSchedule {
  completed: ScheduleSlot[]
  upcoming: ScheduleSlot[]
  today: ScheduleSlot[]
}
export interface ScheduleSummary {
  totalCompletedSlots: number
  totalUpcomingSlots: number
  totalTodaySlots: number
  totalCompletedHours: number
  totalUpcomingHours: number
  totalTodayHours: number
}
export interface TeacherScheduleResponse {
  teacher: {
    teacherId: string
    fullName: string
    position: string
  }
  schedule: TeacherSchedule
  summary: ScheduleSummary
}

// ── My Schedule (CMS teacher self‑view) ──
export interface MyScheduleSlot {
  date: string
  slotId: number
  startTime: string
  endTime: string
  status: 'available' | 'upcoming' | 'completed'
  studentId?: string
  studentEmail?: string
  studentPhone?: string
  registrationId?: string
}

export interface MyScheduleData {
  completed: MyScheduleSlot[]
  available: MyScheduleSlot[]
  upcoming: MyScheduleSlot[]
}

export interface MyScheduleSummary {
  totalCompletedSlots: number
  totalUpcomingSlots: number
  totalAvailableSlots: number
  totalCompletedHours: number
  totalUpcomingHours: number
}

export interface MyScheduleResponse {
  teacherId: string
  schedule: MyScheduleData
  summary: MyScheduleSummary
}
