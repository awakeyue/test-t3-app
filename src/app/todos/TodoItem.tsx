"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { TodoType } from "@/schemas/todo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { deleteTodo, updateTodo } from "@/server/todo-actions";
import { mutate } from "swr";
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
  const handleCheckedChange = async (checked: boolean) => {
    await updateTodo({ id, completed: checked });
    await mutate("todos");
  };

  const renderDelBtn = () => {
    return (
      <div className="absolute right-1 bottom-1">
        <Button
          variant="ghost"
          size={"sm"}
          onClick={() => {
            void deleteTodo(id);
            void mutate("todos");
          }}
        >
          <Trash2 className="h-2 w-2" />
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
            onCheckedChange={handleCheckedChange}
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
