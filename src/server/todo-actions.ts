"use server";

import { db } from "./db";
import { todoInputSchema } from "@/schemas/todo";
import { revalidatePath } from "next/cache";

export async function addTodo(params: { content: string }) {
  // 使用zod验证数据
  // 使用zod验证数据
  const result = todoInputSchema.safeParse(params);

  if (!result.success) {
    // 如果验证失败，返回错误信息
    throw new Error("Invalid todo data");
  }

  try {
    // 创建todo项目
    await db.todo.create({
      data: {
        content: result.data.content,
        priority: result.data.priority ?? "LOW",
        completed: result.data.completed ?? false,
        updatedAt: new Date(),
      },
    });

    // 重新验证相关页面
    revalidatePath("/todos");
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw new Error("Failed to create todo");
  }
}
