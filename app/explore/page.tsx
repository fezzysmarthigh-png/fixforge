import { auth } from "@/auth";
import Post from "./post";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await auth();

  // Redirect if unauthenticated
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-6">
      <Post session={session} />
    </main>
  );
}