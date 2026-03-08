import { z } from 'zod'
import { PASSWORD_REGEX } from '~/constants'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }).min(1, { message: 'Email là bắt buộc' }),
  password: z.string().regex(PASSWORD_REGEX, {
    message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
  })
})

// Types
export type IFormLogin = z.infer<typeof loginSchema>
