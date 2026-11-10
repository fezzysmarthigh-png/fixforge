"use client";

import { useState, useEffect } from "react";
import { Theme } from "@/components/Theme";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { 
  FaArchive, 
  FaTerminal, 
  FaCode, 
  FaSearch, 
  FaSpinner, 
  FaCheckCircle 
} from "react-icons/fa";

interface PostProps {
  session: any;
}

export default function Post({ session }: PostProps) {
  const [archives, setArchives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchArchiveData() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "forge_archives"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setArchives(fetchedData);
      } catch (error) {
        console.error("Error fetching Forge Archive:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArchiveData();
  }, []);

  const filteredArchives = archives.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10">
      {/* Archive Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono w-fit mb-3">
          <FaArchive style={{ color: Theme.primary }} />
          <span className="text-neutral-300">Database-Driven Knowledge Base</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
          The <span style={{ color: Theme.primary }}>Forge Archive</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 font-light max-w-2xl">
          Permanently saved solutions, verified bug fixes, and archived developer roadblocks.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
        <input
          type="text"
          placeholder="Search by topic, language, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-3.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition-colors placeholder-neutral-600 shadow-inner"
        />
      </div>

      {/* Solutions Feed */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-500 font-mono text-sm">
          <FaSpinner className="animate-spin text-amber-400 text-xl" />
          <span>Fetching archive database records...</span>
        </div>
      ) : filteredArchives.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/40 border border-neutral-800 rounded-xl p-8">
          <p className="text-neutral-400 text-sm font-mono">
            {searchQuery
              ? `No archived solutions found matching "${searchQuery}".`
              : "No verified solutions saved to the Forge Archive yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArchives.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between gap-4 hover:border-neutral-700 transition-all shadow-xl"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-amber-400 font-bold">
                    {item.category || "General"}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                    <FaCheckCircle /> Verified Solution
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h2>
                
                <p className="text-neutral-300 text-xs leading-relaxed font-light line-clamp-3">
                  {item.description}
                </p>

                {item.codeSnippet && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <FaTerminal className="text-amber-400" /> Solution Snippet
                    </span>
                    <pre className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 font-mono text-xs text-amber-200 overflow-x-auto max-h-40">
                      {item.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>By: <strong className="text-neutral-300">{item.author || "Community"}</strong></span>
                <span>ID: {item.id.slice(0, 8)}...</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}