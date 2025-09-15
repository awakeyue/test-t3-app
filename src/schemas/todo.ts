import { z } from "zod";

export const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type PriorityEnum = z.infer<typeof PriorityEnum>;

/* 数据库完整形态 */
export const todoSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().min(1, "内容不能为空"),
  priority: PriorityEnum,
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type TodoType = z.infer<typeof todoSchema>;

/* 新增：更新时专用，id 必填，其余可选 */
export const todoUpdateSchema = todoSchema.partial().required({ id: true });

/* 新增/部分更新：创建时允许省略 priority、completed */
export const todoInputSchema = todoSchema
  .pick({ content: true, priority: true, completed: true })
  .partial({ priority: true, completed: true });
export type TodoInputType = z.infer<typeof todoInputSchema>;
