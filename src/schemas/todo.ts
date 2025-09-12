import z from "zod";

export const PriorityEnumSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const todoSchema = z.object({
  id: z.number(),
  content: z.string().min(1),
  priority: PriorityEnumSchema,
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const todoInputSchema = todoSchema
  .pick({
    content: true,
    priority: true,
    completed: true,
  })
  .partial({ priority: true, completed: true });

export type TodoType = z.infer<typeof todoSchema>;
export type TodoInputType = z.infer<typeof todoInputSchema>;
export type PriorityEnum = z.infer<typeof PriorityEnumSchema>;
