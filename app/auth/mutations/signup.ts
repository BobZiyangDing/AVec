import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const version = email.includes(".edu") ? "ACADEMIA" : "ENTERPRISE"
  const role = email.includes("ailurus.bio") ? "ADMIN" : "USER" // 改掉改掉！！！！
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: role, version: version },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
