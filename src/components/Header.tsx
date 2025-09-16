import { cn } from "@/lib/utils";
import ThemeSwitch from "./theme/ThemeSwitch";
import SignOutButton from "./user/SignOut";

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("flex items-center gap-1", className)}>
      <ThemeSwitch />
      <SignOutButton />
    </header>
  );
}
