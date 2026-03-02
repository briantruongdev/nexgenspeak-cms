import { AuthService } from './auth.service'
import { TeacherService } from './teacher.service'

const apiAuth: AuthService = new AuthService()
const apiTeacher: TeacherService = new TeacherService()

export { apiAuth, apiTeacher }
