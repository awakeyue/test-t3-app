"use client";

import { getTodos } from "@/actions/todos";
import useSWR from "swr";
import type { TodoType } from "@/schemas/todo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

type TabsType = "all" | "active" | "completed";
export default function TodoApp() {
  const [tab, setTab] = useState<TabsType>("all");
  const { data: todos, error } = useSWR<TodoType[], Error>("todos", () =>
    getTodos(),
  );

  if (error) return <div>Failed to load todos</div>;
  return (
    <div>
      <div className="bg-background sticky top-0 z-50 flex flex-col gap-2 pt-2">
        <TodoInput />
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
      </div>
      <TodoList todos={todos} tab={tab} />
    </div>
  );
}
