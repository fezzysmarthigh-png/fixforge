"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Theme } from "@/components/Theme";
import { db } from "@/config/firebase";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  addDoc,
  serverTimestamp 
} from "firebase/firestore";
import { 
  FaUser, 
  FaEdit, 
  FaSave, 
  FaTerminal, 
  FaLock, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaSpinner,
  FaArrowLeft,
  FaBug,
  FaCode,
  FaClock,
  FaFolderOpen
} from "react-icons/fa";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // User State
  const [userId, setUserId] = useState<string>("user_default");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  // User Posts Feed
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [processingPostId, setProcessingPostId] = useState<string | null>(null);

  // Helper for Initials badge fallback
  const getInitials = (name?: string | null) => {
    if (!name) return "FF";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // 1. Load User Profile
  useEffect(() => {
    async function loadUserProfile() {
      setLoading(true);
      try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const currentUsername = data.username || "FixForge Engineer";
          setUsername(currentUsername);
          setBio(data.bio || "Building software and tackling bugs on FixForge.");
          setEmail(data.email || "dev@fixforge.io");
          setUserImage(data.image || null);

          // Fetch posts created by this user
          fetchUserPosts(currentUsername);
        } else {
          const fallbackUsername = "FixForge Engineer";
          setUsername(fallbackUsername);
          setBio("Passionate developer solving roadblocks and archiving solutions.");
          setEmail("engineer@fixforge.io");
          
          fetchUserPosts(fallbackUsername);
        }
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [userId]);

  // 2. Fetch User's Specific War Room Posts from Firestore
  const fetchUserPosts = async (currentUsername: string) => {
    setLoadingPosts(true);
    try {
      // Query "war_room_issues" matching username
      const q = query(
        collection(db, "war_room_issues"),
        where("username", "==", currentUsername)
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUserPosts(posts);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  // 3. Save Updated Profile to Firestore
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef, 
        { 
          username: username.trim(), 
          bio: bio.trim(), 
          email: email,
          updatedAt: new Date().toISOString()
        }, 
        { merge: true }
      );

      setSuccessMsg("Profile & bio updated in Firestore!");
      setIsEditingUsername(false);

      // Refresh post query with new username
      fetchUserPosts(username.trim());
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setErrorMsg("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // 4. Resolve & Archive Post directly from Profile
  const handleResolveAndArchive = async (post: any) => {
    setProcessingPostId(post.id);
    try {
      // Mark as resolved in War Room
      const issueRef = doc(db, "war_room_issues", post.id);
      await updateDoc(issueRef, { status: "Resolved" });

      // Automatically copy into Forge Archive
      await addDoc(collection(db, "forge_archives"), {
        title: post.title || `${post.category} Code Fix`,
        category: post.category,
        description: post.description,
        codeSnippet: post.codeSnippet || "",
        author: post.username || username,
        createdAt: serverTimestamp(),
        originalWarRoomId: post.id,
      });

      // Local state update
      setUserPosts((prev) =>
        prev.map((item) =>
          item.id === post.id ? { ...item, status: "Resolved" } : item
        )
      );
    } catch (err) {
      console.error("Error archiving post from profile:", err);
    } finally {
      setProcessingPostId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center font-mono text-sm gap-3">
        <FaSpinner className="animate-spin text-amber-400 text-2xl" />
        <span>Loading developer profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        <main className="py-12 px-5 md:px-10 max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link 
            href="/war-room" 
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors mb-6"
          >
            <FaArrowLeft /> Back to War Room
          </Link>

          {/* Profile Container Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden mb-10">
            
            {/* Header Cover Bar */}
            <div className="h-32 bg-gradient-to-r from-neutral-900 via-amber-950/30 to-neutral-900 border-b border-neutral-800 relative">
              <div className="absolute right-6 top-6 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-amber-400">
                <FaTerminal className="text-[11px]" />
                <span>Verified Developer Profile</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-6 md:px-10 pb-10 relative">
              
              {/* Avatar Section */}
              <div className="-mt-16 mb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div className="relative">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={username}
                      width={112}
                      height={112}
                      className="w-28 h-28 rounded-full border-4 border-neutral-900 object-cover shadow-xl"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-neutral-950 border-4 border-neutral-900 text-amber-400 font-mono font-extrabold text-2xl flex items-center justify-center shadow-xl">
                      {getInitials(username)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-950 px-3.5 py-2 rounded-lg border border-neutral-800">
                  <FaCalendarAlt className="text-amber-400" /> Member since 2026
                </div>
              </div>

              {/* Status Alerts */}
              {successMsg && (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-lg text-xs font-mono flex items-center gap-2">
                  <FaCheckCircle /> {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              {/* Editable Profile Form */}
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
                
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <FaUser className="text-[11px]" /> Username (Editable)
                  </label>
                  
                  <div className="flex items-center gap-3">
                    {isEditingUsername ? (
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-1 bg-neutral-950 border border-amber-400 rounded-lg px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
                      />
                    ) : (
                      <div className="flex-1 bg-neutral-950/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm font-mono text-white">
                        {username}
                      </div>
                    )}

                    {isEditingUsername ? (
                      <button
                        type="submit"
                        disabled={saving}
                        style={{ backgroundColor: Theme.primary }}
                        className="text-black font-bold px-5 py-2.5 rounded-lg text-xs font-mono hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                      >
                        {saving ? <FaSpinner className="animate-spin" /> : <FaSave />} Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingUsername(true)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border border-neutral-700"
                      >
                        <FaEdit className="text-amber-400" /> Edit Username
                      </button>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 font-semibold flex items-center gap-1.5">
                    <FaLock className="text-[10px]" /> Email Address (Read Only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="bg-neutral-950/40 border border-neutral-800/60 rounded-lg px-4 py-2.5 text-sm font-mono text-neutral-500 cursor-not-allowed"
                  />
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center gap-1.5">
                    Developer Bio & Context
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell other engineers about your tech stack, projects, or expertise..."
                    className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors text-white placeholder-neutral-600 resize-y"
                  ></textarea>
                </div>

              </form>

            </div>
          </div>

          {/* User Posts Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FaBug className="text-amber-400" />
                <h2 className="text-lg font-extrabold uppercase tracking-wide">
                  Your Posted Dispatches ({userPosts.length})
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500">Live Activity Feed</span>
            </div>

            {loadingPosts ? (
              <div className="flex items-center justify-center py-12 gap-2 text-neutral-500 font-mono text-xs">
                <FaSpinner className="animate-spin text-amber-400" /> Loading your activity...
              </div>
            ) : userPosts.length === 0 ? (
              <div className="text-center py-12 bg-neutral-950/40 border border-neutral-800/80 rounded-lg p-6">
                <FaFolderOpen className="mx-auto text-neutral-600 text-2xl mb-2" />
                <p className="text-neutral-400 text-xs font-mono mb-3">
                  You haven't posted any roadblocks or code dispatches yet.
                </p>
                <Link href="/war-room/new" className="text-amber-400 font-bold text-xs hover:underline">
                  + Dispatch a new roadblock to War Room
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-neutral-950 border border-neutral-800 rounded-lg p-5 flex flex-col gap-3 hover:border-neutral-700 transition-colors relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">
                        {post.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          post.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                        }`}
                      >
                        {post.status || "Open"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{post.title}</h3>
                    <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>

                    {post.codeSnippet && (
                      <pre className="bg-neutral-900 border border-neutral-800 rounded p-3 font-mono text-[11px] text-amber-200 overflow-x-auto max-h-28">
                        {post.codeSnippet}
                      </pre>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[10px]" /> ID: {post.id.slice(0, 8)}...
                      </span>

                      {post.status !== "Resolved" && (
                        <button
                          onClick={() => handleResolveAndArchive(post)}
                          disabled={processingPostId === post.id}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {processingPostId === post.id ? (
                            <FaSpinner className="animate-spin text-[10px]" />
                          ) : (
                            <FaCheckCircle className="text-[10px]" />
                          )}
                          <span>Mark Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800 py-6 px-5 text-center text-xs">
        <p>© {new Date().getFullYear()} Fix Forge. Built for software developers.</p>
      </footer>
    </div>
  );
}