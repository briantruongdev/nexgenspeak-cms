export interface IStudent {
  userId: string
  email: string
  phone: string
  fullName: string
  slotAvailablePerDay: string
  expirationDate: string
  createdAt: string
}

export interface IResponseStudent {
  students: IStudent[]
  total: number
}
