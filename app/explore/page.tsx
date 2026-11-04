"use client";

import { useState } from "react";
import Link from "next/link";
import { Theme } from "@/components/Theme";
import { 
  FaSearch, 
  FaBookmark, 
  FaThumbsUp, 
  FaCopy, 
  FaCheck, 
  FaCode, 
  FaTerminal, 
  FaFilter,
  FaShareAlt,
  FaUserCheck,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";

interface FixedError {
  id: string;
  title: string;
  errorTrace: string;
  solution: string;
  author: string;
  authorRole: "Senior Engineer" | "Indie Hacker" | "Student Dev" | "Full Stack Dev";
  category: string;
  upvotes: number;
  savedCount: number;
  date: string;
}

export default function ForgeArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [errors, setErrors] = useState<FixedError[]>([
    {
      id: "err-1",
      title: "TypeError: Cannot read property 'id' of undefined in NextAuth JWT Callback",
      errorTrace: "TypeError: Cannot read property 'id' of undefined\n  at jwt (app/api/auth/[...nextauth]/route.ts:24:18)\n  at async handleAuth (node_modules/next-auth/core/index.js)",
      solution: "Ensure optional chaining is used inside the JWT callback when session object hasn't populated yet:\n\n// Fix:\ntoken.id = user?.id ?? token.sub;",
      author: "Alex Turner",
      authorRole: "Senior Engineer",
      category: "Next.js",
      upvotes: 42,
      savedCount: 18,
      date: "Oct 28, 2026",
    },
    {
      id: "err-2",
      title: "Prisma Error P2002: Unique constraint failed on the fields (email)",
      errorTrace: "PrismaClientKnownRequestError: Unique constraint failed on the constraint: `User_email_key`\n  code: 'P2002',\n  meta: { target: ['email'] }",
      solution: "Wrap the write operation in a try-catch block and handle error code P2002 explicitly to return a friendly user error response instead of crashing the API route.",
      author: "David K.",
      authorRole: "Full Stack Dev",
      category: "PostgreSQL",
      upvotes: 29,
      savedCount: 12,
      date: "Oct 25, 2026",
    },
    {
      id: "err-3",
      title: "CORS preflight request fails with 403 Forbidden in Express.js",
      errorTrace: "Access to fetch at 'https://api.fixforge.dev' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check.",
      solution: "Configure cors middleware explicitly with credentials and allowed headers before mounting router middleware:\n\napp.use(cors({ origin: 'http://localhost:3000', credentials: true }));",
      author: "Sarah Chen",
      authorRole: "Indie Hacker",
      category: "Node.js",
      upvotes: 56,
      savedCount: 31,
      date: "Oct 20, 2026",
    },
  ]);

  const categories = ["All", "Next.js", "React", "Node.js", "PostgreSQL", "Python", "Tailwind"];

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpvote = (id: string) => {
    setErrors((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      )
    );
  };

  const filteredErrors = errors.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.errorTrace.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        {/* Header Hero */}
        <section className="relative py-16 px-5 md:px-10 bg-[url('/bg.jfif')] bg-no-repeat bg-center bg-cover border-b border-neutral-800">
          <div className="absolute inset-0 bg-black/85"></div>

          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono w-fit">
                <FaTerminal style={{ color: Theme.primary }} />
                <span className="text-neutral-300">Forge Archive • Knowledge Repository</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
                Community <span style={{ color: Theme.primary }}>Fixed Errors</span>
              </h1>

              <p className="text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
                Explore verified debugging solutions contributed by developers. Never solve the same frustrating stack trace twice.
              </p>
            </div>

            {/* Share a Fix CTA */}
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-xl flex flex-col gap-4 w-full md:w-80 shadow-xl">
              <h3 className="text-lg font-bold">Solved a tough bug?</h3>
              <p className="text-xs text-neutral-400">
                Help other developers by sharing your root cause and solution code.
              </p>
              <Link
                href="/share-fix"
                style={{ backgroundColor: Theme.primary }}
                className="text-black font-bold py-3 px-4 rounded-md text-center text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <FaCode /> Publish Resolved Fix
              </Link>
            </div>
          </div>
        </section>

        {/* CROSS-NAVIGATION BANNER: ROUTE TO WAR ROOM */}
        <section className="bg-neutral-900/90 border-b border-neutral-800 py-3.5 px-5 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <FaShieldAlt className="text-amber-400 text-sm" />
              <span>Can't find your stack trace in the archive? Get peer debugging help.</span>
            </div>
            <Link
              href="/war-room"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1.5 whitespace-nowrap"
            >
              Post to War Room Help Queue <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="py-8 px-5 md:px-10 bg-neutral-900 border-b border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute left-4 top-3.5 text-neutral-500 text-sm" />
              <input
                type="text"
                placeholder="Search error messages, stack traces, or frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs text-neutral-500 font-mono uppercase flex items-center gap-1 mr-2">
                <FaFilter className="text-[10px]" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-amber-400 text-black font-bold"
                      : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Feed */}
        <section className="py-12 px-5 md:px-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Archive Entries ({filteredErrors.length})
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              Showing verified solutions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredErrors.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 md:p-8 flex flex-col gap-6 hover:border-amber-400/40 transition-all shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        Logged on {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-800 w-fit">
                    <FaUserCheck className="text-emerald-400 text-sm" />
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-neutral-200">{item.author}</span>
                      <span className="text-neutral-500 text-[10px]">{item.authorRole}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-red-400 font-semibold uppercase flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Reported Stack Trace
                  </span>
                  <pre className="bg-neutral-950 border border-neutral-800/90 rounded-lg p-4 font-mono text-xs text-red-300 overflow-x-auto whitespace-pre-wrap">
                    {item.errorTrace}
                  </pre>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Verified Solution
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, item.solution)}
                      className="text-xs font-mono flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800"
                    >
                      {copiedId === item.id ? (
                        <>
                          <FaCheck className="text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy /> Copy Fix
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                    {item.solution}
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleUpvote(item.id)}
                      className="flex items-center gap-1.5 hover:text-amber-400 transition-colors bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800"
                    >
                      <FaThumbsUp className="text-xs" />
                      <span>{item.upvotes} Upvotes</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800">
                      <FaBookmark className="text-xs text-amber-400" />
                      <span>{item.savedCount} Saved</span>
                    </button>
                  </div>

                  <button className="hover:text-white flex items-center gap-1 transition-colors">
                    <FaShareAlt /> Share
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800 py-6 px-5 text-center text-xs">
        <p>© {new Date().getFullYear()} Fix Forge. Built for software developers.</p>
      </footer>
    </div>
  );
}