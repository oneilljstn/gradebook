import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/features/auth/lib/auth-client";
import { isAdminEmail } from "~/lib/config";


export const Route = createFileRoute("/")({
  component: Home,
});



function Home() {
  const { data: session } = authClient.useSession();
  const isAdmin = isAdminEmail(session?.user?.email);
  return (
    <div className="p-4 md:p-6 container mx-auto flex flex-col gap-4">
      <span>Home</span>
      <span className="text-lg font-bold">  Welcome, {session?.user?.name}</span>
      <div>
        User Info
        <div className="flex flex-col gap-2">
          <span>Email: {session?.user?.email}</span>
          <span>Name: {session?.user?.name}</span>
          <span>Is Admin: {isAdmin ? "Yes" : "No"}</span>
          <span>ID: {session?.user?.id}</span>
          <span>Session ID: {session?.session?.id}</span>
        </div>
      </div>
    </div>
  );
}
