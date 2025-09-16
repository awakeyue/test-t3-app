"use server";

import {
  todoInputSchema,
  todoUpdateSchema, // 新增：更新时允许 id 必填，其余可选
  type TodoType,
} from "@/schemas/todo";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";

/* ---------------- 新增 ---------------- */
const handleError = (e: unknown, msg: string) => {
  console.error(msg, e);
  throw new Error(msg);
};
/* -------------------------------------- */

/** 创建 todo */
export async function addTodo(values: unknown) {
  // 1. 运行时校验
  const parsed = todoInputSchema.safeParse(values);
  if (!parsed.success) {
    // 把 zod 错误抛给前端，方便调试
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }

  try {
    await db.todo.create({
      data: {
        content: parsed.data.content,
        priority: parsed.data.priority ?? "LOW",
        completed: parsed.data.completed ?? false,
      },
    });
    revalidatePath("/todos");
  } catch (e) {
    handleError(e, "Failed to create todo");
  }
}

/** 查询全部 todo */
export async function getTodos(): Promise<TodoType[]> {
  try {
    return await db.todo.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    handleError(e, "Failed to fetch todos");
    return []; // 添加默认返回值以满足 TypeScript 类型检查
  }
}

/** 更新 todo */
export async function updateTodo(values: unknown) {
  const parsed = todoUpdateSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }

  const { id, ...rest } = parsed.data;
  try {
    const updated = await db.todo.update({
      where: { id },
      data: rest,
    });
    revalidatePath("/todos");
    return updated;
  } catch (e) {
    handleError(e, "Failed to update todo");
  }
}

/** 删除 todo */
export async function deleteTodo(id: number) {
  try {
    await db.todo.delete({ where: { id } });
    revalidatePath("/todos");
  } catch (e) {
    handleError(e, "Failed to delete todo");
  }
}
