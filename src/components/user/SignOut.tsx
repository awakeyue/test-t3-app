import { signOut } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function SignOutButton({
  className,
}: {
  className?: string;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return (
    data.user && (
      <Button variant="outline" className={className} onClick={signOut}>
        Sign out
      </Button>
    )
  );
}
