"use client";

import { useState } from "react";
import Link from "next/link";
import { Theme } from "@/components/Theme";
import { 
  FaSearch, 
  FaShieldAlt, 
  FaPlus, 
  FaComments, 
  FaClock, 
  FaUserAstronaut,
  FaTerminal,
  FaArrowRight
} from "react-icons/fa";

interface WarRoomError {
  id: string;
  title: string;
  errorTrace: string;
  description: string;
  author: string;
  category: string;
  severity: "Critical" | "Blocker" | "Moderate" | "Minor";
  status: "Open" | "Under Investigation" | "Resolved";
  responsesCount: number;
  date: string;
}

export default function WarRoomPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [issues] = useState<WarRoomError[]>([
    {
      id: "issue-1",
      title: "App Router Middleware Infinite Redirect Loop with NextAuth v5",
      errorTrace: "ERR_TOO_MANY_REDIRECTS: http://localhost:3000/sign-in -> /dashboard -> /signin",
      description: "My custom middleware matcher seems to intercept authenticated session tokens incorrectly, causing an endless redirect loop between the dashboard and sign-in pages.",
      author: "Kelvin M.",
      category: "Next.js",
      severity: "Critical",
      status: "Open",
      responsesCount: 3,
      date: "30 mins ago",
    },
    {
      id: "issue-2",
      title: "Prisma Client Initialization Failure on Serverless Edge Runtime",
      errorTrace: "PrismaClientInitializationError: Library `@prisma/client/runtime/edge.js` could not be loaded.",
      description: "Trying to deploy our Next.js API routes onto a serverless edge endpoint, but Prisma keeps throwing initialization exceptions regarding engine binary targets.",
      author: "Amina Yusuf",
      category: "PostgreSQL",
      severity: "Blocker",
      status: "Under Investigation",
      responsesCount: 7,
      date: "2 hours ago",
    },
    {
      id: "issue-3",
      title: "Tailwind CSS v4 JIT Compiler ignores custom color definitions",
      errorTrace: "Warning: Utility class 'bg-brand-amber' evaluated to undefined style rules.",
      description: "After upgrading to Tailwind v4, custom theme extensions defined in our config file are no longer being recognized in component className strings.",
      author: "Tunde Bakare",
      category: "Tailwind",
      severity: "Moderate",
      status: "Resolved",
      responsesCount: 5,
      date: "Yesterday",
    },
  ]);

  const statuses = ["All", "Open", "Under Investigation", "Resolved"];

  const filteredIssues = issues.filter((item) => {
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.errorTrace.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "Blocker":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <span className="text-red-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Open</span>;
      case "Under Investigation":
        return <span className="text-amber-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Investigating</span>;
      case "Resolved":
        return <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        {/* Header Hero */}
        <section className="relative py-16 px-5 md:px-10 bg-[url('/bg.jfif')] bg-no-repeat bg-center bg-cover border-b border-neutral-800">
          <div className="absolute inset-0 bg-black/85"></div>

          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono w-fit">
                <FaShieldAlt style={{ color: Theme.primary }} />
                <span className="text-neutral-300">War Room • Developer Help Queue</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
                Active <span style={{ color: Theme.primary }}>Debugging Queue</span>
              </h1>

              <p className="text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
                Stuck on a roadblock? Post your unresolved errors and stack traces here so advanced engineers and peers can help triage and solve them.
              </p>
            </div>

            {/* Post Issue CTA Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-xl flex flex-col gap-4 w-full md:w-80 shadow-xl">
              <h3 className="text-lg font-bold">Stuck on an error?</h3>
              <p className="text-xs text-neutral-400">
                Share your roadblock with the community and get targeted assistance.
              </p>
              <Link
                href="/war-room/new"
                style={{ backgroundColor: Theme.primary }}
                className="text-black font-bold py-3 px-4 rounded-md text-center text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <FaPlus /> Post Error to War Room
              </Link>
            </div>
          </div>
        </section>

        {/* CROSS-NAVIGATION BANNER: ROUTE TO ARCHIVE */}
        <section className="bg-neutral-900/90 border-b border-neutral-800 py-3.5 px-5 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <FaTerminal className="text-amber-400 text-sm" />
              <span>Before posting, check if another developer has already archived the fix.</span>
            </div>
            <Link
              href="/explore"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1.5 whitespace-nowrap"
            >
              Search Forge Archive →
            </Link>
          </div>
        </section>

        {/* Search & Status Filter Bar */}
        <section className="py-8 px-5 md:px-10 bg-neutral-900 border-b border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute left-4 top-3.5 text-neutral-500 text-sm" />
              <input
                type="text"
                placeholder="Search active issues by keyword or error trace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none font-mono">
              <span className="text-xs text-neutral-500 uppercase mr-2">Status:</span>
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => setSelectedStatus(stat)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all whitespace-nowrap ${
                    selectedStatus === stat
                      ? "bg-amber-400 text-black font-bold"
                      : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Queue Feed */}
        <section className="py-12 px-5 md:px-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Active Queue ({filteredIssues.length})
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              Live peer assistance board
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredIssues.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 md:p-8 flex flex-col gap-5 hover:border-amber-400/40 transition-all shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold">
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded border text-[11px] font-mono font-semibold ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                        <FaClock className="text-[10px]" /> {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>

                  <div className="bg-neutral-950 px-3.5 py-2 rounded-lg border border-neutral-800 text-xs font-mono w-fit">
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-red-400 font-semibold uppercase flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Error Trace
                  </span>
                  <pre className="bg-neutral-950 border border-neutral-800/90 rounded-lg p-4 font-mono text-xs text-red-300 overflow-x-auto whitespace-pre-wrap">
                    {item.errorTrace}
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <FaUserAstronaut className="text-amber-400 text-sm" />
                    <span>Posted by <strong className="text-white">{item.author}</strong></span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-neutral-300">
                      <FaComments className="text-amber-400" />
                      <span>{item.responsesCount} Responses</span>
                    </span>

                    <Link
                      href={`/war-room/${item.id}`}
                      style={{ color: Theme.primary }}
                      className="font-bold hover:underline flex items-center gap-1"
                    >
                      Join Investigation →
                    </Link>
                  </div>
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