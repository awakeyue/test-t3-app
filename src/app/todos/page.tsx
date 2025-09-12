import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TodoInput from "./TodoInput";

function TodoList() {
  return <div></div>;
}

function TodoItem() {
  return <div></div>;
}

export default function TodoPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Todos</CardTitle>
          <CardDescription>your todos app</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoInput />
        </CardContent>
        <CardFooter>footer</CardFooter>
      </Card>
    </div>
  );
}
