export interface IResponseLogin {
  message: string
  token: string
  user: {
    userId: string
    email: string
    fullName: string
    role: 'admin' | 'teacher'
    teacherId: string | null
  }
}

export interface IResponseRegisterAndResetPassword {
  message: string
  userId: string
  email: string
}
