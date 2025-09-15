"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addTodo } from "@/server/todo-actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mutate } from "swr";
import PriorityTag from "./PriorityTag";
import { CornerDownLeft } from "lucide-react";

export default function TodoInput() {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("LOW");

  const createTodo = async () => {
    if (content.trim()) {
      try {
        await addTodo({ content, priority });
        setContent("");
        await mutate("todos");
      } catch (error) {
        console.error("Failed to create todo:", error);
        // 这里可以添加错误提示
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请输入待办事项"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void createTodo();
              }
            }}
          />
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value)}
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
          <Button onClick={() => void createTodo()}>
            <CornerDownLeft />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
