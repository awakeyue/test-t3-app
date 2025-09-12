"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addTodo } from "@/server/todo-actions";

export default function TodoInput() {
  const [content, setContent] = useState("");

  const createTodo = async () => {
    if (content.trim()) {
      try {
        await addTodo({ content });
        setContent("");
      } catch (error) {
        console.error("Failed to create todo:", error);
        // 这里可以添加错误提示
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="add todo"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void createTodo();
          }
        }}
      />
      <Button onClick={() => void createTodo()}>Add</Button>
    </div>
  );
}