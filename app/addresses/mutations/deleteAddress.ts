import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAddress = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAddress), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const address = await db.address.deleteMany({ where: { id } })

  return address
})
