"use client";

import { getTodos } from "@/server/todo-actions";
import { TodoItem } from "./TodoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useSWR from "swr";
import type { TodoType } from "@/schemas/todo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type TabsType = "all" | "active" | "completed";
export default function TodoList() {
  const [parent] = useAutoAnimate();
  const [tab, setTab] = useState<TabsType>("all");
  const { data: todos, error } = useSWR<TodoType[], Error>("todos", () =>
    getTodos(),
  );

  const filterTodos = todos?.filter((todo) => {
    if (tab === "all") return true;
    if (tab === "active") return !todo.completed;
    if (tab === "completed") return todo.completed;
  });

  if (error) return <div>Failed to load todos</div>;
  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as TabsType)}
        className="mb-4 w-[400px]"
      >
        <TabsList>
          <TabsTrigger value="all" className="text-xs">
            全部
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs">
            未完成
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">
            已完成
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea>
        <div className="flex flex-col gap-2" ref={parent}>
          {filterTodos?.map((todo) => (
            <TodoItem key={todo.id + tab} {...todo} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
