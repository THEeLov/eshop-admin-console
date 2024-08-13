import { z } from "zod";

export const createUpdateCategorySchema = z.object({
  body: z.object({
    title: z.string().min(4),
    description: z.string().min(4)
  })
})

export const pageNumberCategorySchema = z.object({
  query: z.object({
    page: z.coerce.number().positive()
  })
})

export const idCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
})