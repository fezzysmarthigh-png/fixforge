import Link from "next/link";
import Image from "next/image";
import { Theme } from "@/components/Theme";
import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        <main className="py-16 px-5 flex items-center justify-center">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
            
            <div className="text-center flex flex-col items-center gap-3 mb-8">
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <Image src="/favicon.ico" alt="FixForge" width={36} height={36} className="w-9 h-9" />
              </div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight">
                Sign In to <span style={{ color: Theme.primary }}>FixForge</span>
              </h1>
              <p className="text-xs text-neutral-400 font-mono">
                Access your bug logs, investigations, and solutions.
              </p>
            </div>

            {/* OAuth sign-in via server actions (NextAuth v5 needs a POST to start OAuth) */}
            <div className="flex flex-col gap-3">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 font-medium py-3 px-4 rounded-md flex items-center justify-center gap-3 transition-colors text-sm text-neutral-200 cursor-pointer"
                >
                  <FcGoogle className="text-xl" />
                  <span>Continue with Google</span>
                </button>
              </form>

              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 font-medium py-3 px-4 rounded-md flex items-center justify-center gap-3 transition-colors text-sm text-neutral-200 cursor-pointer"
                >
                  <FaGithub className="text-xl text-white" />
                  <span>Continue with GitHub</span>
                </button>
              </form>
            </div>

            <div className="relative my-6 flex items-center justify-center">
              <div className="border-t border-neutral-800 w-full"></div>
              <span className="bg-neutral-900 px-3 text-xs text-neutral-500 font-mono uppercase absolute">
                Or with email
              </span>
            </div>

            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <FaEnvelope className="text-[10px]" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="dev@example.com"
                  className="bg-neutral-950 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <FaLock className="text-[10px]" /> Password
                  </label>
                  <Link href="#" className="text-[11px] text-amber-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="bg-neutral-950 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: Theme.primary }}
                className="w-full text-black font-bold py-3 px-4 rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2 text-sm cursor-pointer"
              >
                Sign In <FaArrowRight className="text-xs" />
              </button>
            </form>

            <p className="text-center text-xs text-neutral-400 mt-6">
              Don't have an account?{" "}
              <Link href="/get-started" className="text-amber-400 font-bold hover:underline">
                Get Started
              </Link>
            </p>

          </div>
        </main>
      </div>

      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800 py-6 px-5 text-center text-xs">
        <p>© {new Date().getFullYear()} Fix Forge. Built for software developers.</p>
      </footer>
    </div>
  );
}