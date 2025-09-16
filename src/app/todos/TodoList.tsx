"use client";

import type { TodoType } from "@/schemas/todo";
import { Coffee } from "lucide-react";
import { TodoItem } from "./TodoItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type TabsType = "all" | "active" | "completed";

export default function TodoList({
  todos,
  tab,
}: {
  todos: TodoType[] | undefined;
  tab: TabsType;
}) {
  const [parent] = useAutoAnimate();
  const filterTodos = todos?.filter((todo) => {
    if (tab === "all") return true;
    if (tab === "active") return !todo.completed;
    if (tab === "completed") return todo.completed;
  });

  return (
    <div className="flex flex-col gap-2" ref={parent}>
      {filterTodos?.map((todo) => (
        <TodoItem key={todo.id + tab} {...todo} />
      ))}
      {filterTodos?.length === 0 && <Empty tab={tab} />}
    </div>
  );
}

function Empty({ tab }: { tab: TabsType }) {
  const text =
    tab === "active"
      ? "没有未完成任务 ~"
      : tab === "completed"
        ? "没有已完成任务 ~"
        : "没有任务 ~";
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-1">
      <Coffee size={32} />
      <div className="text-center text-xs">{text}</div>
    </div>
  );
}
