import { AuthService } from './auth.service'
import { StudentService } from './student.service'
import { TeacherService } from './teacher.service'

const apiAuth: AuthService = new AuthService()
const apiTeacher: TeacherService = new TeacherService()
const apiStudent: StudentService = new StudentService()

export { apiAuth, apiTeacher, apiStudent }
