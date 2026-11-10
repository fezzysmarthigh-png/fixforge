"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Theme } from "@/components/Theme";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  FaBug, 
  FaPlus, 
  FaTerminal, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaClock, 
  FaFilter,
  FaSpinner
} from "react-icons/fa";

export default function WarRoomPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"All" | "Open" | "Resolved">("Open");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch live issues from Firestore
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "war_room_issues"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setIssues(fetchedData);
    } catch (error) {
      console.error("Error fetching War Room issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Handler to resolve an issue AND automatically send it to Forge Archive
  const handleResolveAndArchive = async (issue: any) => {
    setProcessingId(issue.id);
    try {
      // 1. Update War Room document status to "Resolved"
      const issueRef = doc(db, "war_room_issues", issue.id);
      await updateDoc(issueRef, {
        status: "Resolved",
      });

      // 2. Automatically push a copy to the "forge_archives" collection
      await addDoc(collection(db, "forge_archives"), {
        title: issue.title,
        category: issue.category,
        description: issue.description,
        codeSnippet: issue.errorTrace || "",
        reproductionSteps: issue.reproductionSteps || "",
        author: issue.author || "War Room Engineer",
        createdAt: serverTimestamp(),
        originalWarRoomId: issue.id,
      });

      // 3. Update local state
      setIssues((prev) =>
        prev.map((item) =>
          item.id === issue.id ? { ...item, status: "Resolved" } : item
        )
      );
    } catch (error) {
      console.error("Error resolving and archiving issue:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    if (filterStatus === "All") return true;
    return (issue.status || "Open") === filterStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        {/* Header Banner */}
        <section className="py-12 px-5 md:px-10 border-b border-neutral-800 bg-neutral-900/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono w-fit">
                <FaBug style={{ color: Theme.primary }} />
                <span className="text-neutral-300">Live Incident Triage & Queue</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
                The <span style={{ color: Theme.primary }}>War Room</span>
              </h1>
              <p className="text-sm md:text-base text-neutral-400 max-w-2xl font-light">
                Active technical roadblocks submitted by developers. Inspect error traces, collaborate on fixes, or dispatch your own.
              </p>
            </div>

            <Link
              href="/war-room/new"
              style={{ backgroundColor: Theme.primary }}
              className="text-black font-bold py-3.5 px-6 rounded-md text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-xl whitespace-nowrap cursor-pointer"
            >
              <FaPlus /> Post Unresolved Error
            </Link>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="py-6 px-5 md:px-10 border-b border-neutral-800 bg-neutral-900/30">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <FaFilter className="text-amber-400" /> Filter Queue:
            </div>
            <div className="flex gap-2">
              {(["Open", "Resolved", "All"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                    filterStatus === status
                      ? "bg-amber-400 text-black font-bold"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Live Issue Feed */}
        <main className="py-10 px-5 md:px-10 max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-500 font-mono text-sm">
              <FaSpinner className="animate-spin text-amber-400 text-xl" />
              <span>Fetching live incident queue...</span>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/40 border border-neutral-800 rounded-xl p-8">
              <p className="text-neutral-400 text-sm font-mono mb-4">
                No {filterStatus !== "All" ? filterStatus.toLowerCase() : ""} issues currently in the War Room.
              </p>
              <Link
                href="/war-room/new"
                className="text-amber-400 font-bold text-xs hover:underline"
              >
                + Dispatch a new roadblock
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 md:p-8 flex flex-col gap-5 hover:border-neutral-700 transition-all shadow-xl relative overflow-hidden"
                >
                  {/* Status Indicator Stripe */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      issue.status === "Resolved" ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  />

                  {/* Card Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-amber-400 font-mono text-xs font-bold">
                        {issue.category}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-red-950/40 border border-red-900/50 text-red-400 font-mono text-xs flex items-center gap-1">
                        <FaExclamationTriangle className="text-[10px]" /> {issue.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[10px]" />{" "}
                        {issue.createdAt?.toDate
                          ? new Date(issue.createdAt.toDate()).toLocaleDateString()
                          : "Recently"}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          issue.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                        }`}
                      >
                        {issue.status || "Open"}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h2 className="text-xl font-extrabold text-white mb-2">
                      {issue.title}
                    </h2>
                    <p className="text-neutral-300 text-sm leading-relaxed font-light">
                      {issue.description}
                    </p>
                  </div>

                  {/* Error Trace Display */}
                  {issue.errorTrace && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-mono text-red-400 font-semibold flex items-center gap-1.5">
                        <FaTerminal className="text-[11px]" /> Stack Trace Log
                      </span>
                      <pre className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 font-mono text-xs text-red-300 overflow-x-auto whitespace-pre-wrap max-h-48">
                        {issue.errorTrace}
                      </pre>
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs font-mono">
                    <span className="text-neutral-500">
                      ID: <span className="text-neutral-400">{issue.id.slice(0, 8)}...</span>
                    </span>

                    {issue.status !== "Resolved" && (
                      <button
                        onClick={() => handleResolveAndArchive(issue)}
                        disabled={processingId === issue.id}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-md font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {processingId === issue.id ? (
                          <>
                            <FaSpinner className="animate-spin text-xs" /> Archiving...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle /> Mark Resolved & Archive
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800 py-6 px-5 text-center text-xs">
        <p>© {new Date().getFullYear()} Fix Forge. Built for software developers.</p>
      </footer>
    </div>
  );
}