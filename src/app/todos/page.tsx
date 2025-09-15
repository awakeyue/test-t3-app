import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoPage() {
  return (
    <div className="flex flex-col gap-4">
      <TodoInput />
      <TodoList />
    </div>
  );
}
