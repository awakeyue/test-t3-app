"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { TodoType } from "@/schemas/todo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { deleteTodo, updateTodo } from "@/actions/todos";
import { useSWRConfig } from "swr";
import PriorityTag from "./PriorityTag";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export function TodoItem({
  id,
  content,
  priority,
  completed,
  createdAt,
}: TodoType) {
  const { mutate } = useSWRConfig();

  const handleCheckedChange = async (checked: boolean) => {
    // 乐观更新：立即更新UI
    void mutate<TodoType[]>(
      "todos",
      (todos) =>
        todos?.map((todo) =>
          todo.id === id ? { ...todo, completed: checked } : todo,
        ) ?? [],
      { revalidate: false },
    );

    try {
      // 发送请求到服务器
      await updateTodo({ id, completed: checked });
      // 成功后重新验证数据
      void mutate("todos");
    } catch (error) {
      // 如果失败，显示错误并重新获取数据
      console.error("Failed to update todo:", error);
      void mutate("todos");
    }
  };

  const handleDelete = async () => {
    // 乐观更新：立即从列表中移除
    void mutate<TodoType[]>(
      "todos",
      (todos) => todos?.filter((todo) => todo.id !== id) ?? [],
      { revalidate: false },
    );

    try {
      // 发送删除请求到服务器
      await deleteTodo(id);
      // 成功后重新验证数据
      void mutate("todos");
    } catch (error) {
      // 如果失败，显示错误并重新获取数据
      console.error("Failed to delete todo:", error);
      void mutate("todos");
    }
  };

  const renderDelBtn = () => {
    return (
      <div className="absolute right-1 bottom-1">
        <Button variant="ghost" size={"sm"} onClick={() => void handleDelete()}>
          <Trash2 className="text-muted-foreground h-2 w-2" />
        </Button>
      </div>
    );
  };

  return (
    <Card className={cn(completed && "opacity-60", "relative")}>
      <CardContent className="px-4 py-2">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={completed}
            className="mt-1"
            onCheckedChange={(checked) => {
              if (typeof checked === "boolean") {
                void handleCheckedChange(checked);
              }
            }}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p
                className={cn(
                  "text-sm leading-relaxed font-medium text-balance",
                  completed && "text-muted-foreground line-through",
                )}
              >
                {content}
              </p>

              <PriorityTag priority={priority} />
            </div>

            <p className="text-muted-foreground text-xs">
              创建于 {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          {completed && renderDelBtn()}
        </div>
      </CardContent>
    </Card>
  );
}
