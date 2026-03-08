import { AuthService } from './auth.service'
import { CmsTeacherService } from './cms-teacher.service'
import { StudentService } from './student.service'
import { TeacherService } from './teacher.service'

const apiAuth: AuthService = new AuthService()
const apiTeacher: TeacherService = new TeacherService()
const apiStudent: StudentService = new StudentService()
const apiCmsTeacher: CmsTeacherService = new CmsTeacherService()

export { apiAuth, apiTeacher, apiStudent, apiCmsTeacher }
