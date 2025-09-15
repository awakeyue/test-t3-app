import { Badge } from "@/components/ui/badge";
import type { PriorityEnum } from "@/schemas/todo";

const priorityMaps = {
  HIGH: {
    label: "高",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  LOW: {
    label: "低",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  MEDIUM: {
    label: "中",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
};

export default function PriorityTag({ priority }: { priority: PriorityEnum }) {
  return (
    <Badge
      variant={"default"}
      className={`text-xs ${priorityMaps[priority].color}`}
    >
      {priorityMaps[priority].label}
    </Badge>
  );
}
