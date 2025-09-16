"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addTodo } from "@/actions/todos";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import PriorityTag from "./PriorityTag";
import { CornerDownLeft } from "lucide-react";

export default function TodoInput() {
  const { mutate } = useSWRConfig();
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("LOW");
  const { trigger, isMutating } = useSWRMutation(
    "todos/create",
    (_key, { arg }: { arg: { content: string; priority: string } }) =>
      addTodo(arg),
  );

  async function createTodo() {
    if (content.trim() && !isMutating) {
      try {
        await trigger({ content, priority });
        setContent("");
        await mutate("todos");
      } catch (error) {
        console.error("Failed to create todo:", error);
        // 这里可以添加错误提示
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请输入待办事项"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isMutating) {
                void createTodo();
              }
            }}
            disabled={isMutating}
          />
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value)}
            disabled={isMutating}
          >
            <SelectTrigger>
              <SelectValue placeholder="priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">
                <PriorityTag priority="LOW" />
              </SelectItem>
              <SelectItem value="MEDIUM">
                <PriorityTag priority="MEDIUM" />
              </SelectItem>
              <SelectItem value="HIGH">
                <PriorityTag priority="HIGH" />
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => void createTodo()} disabled={isMutating}>
            {isMutating ? (
              <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-white" />
            ) : (
              <div className="h-4 w-4">
                <CornerDownLeft />
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
