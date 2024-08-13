// TODO Place your validation schemas here
import { z } from "zod"

export const createUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(4),
    description: z.string(),
    price: z.number().positive(),
    categoryId: z.string()
  })
})

export const pageNumberSchema = z.object({
  query: z.object({
    page: z.coerce.number().positive()
  })
})

export const idSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
})